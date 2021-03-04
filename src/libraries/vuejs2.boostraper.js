
function vuejsbootstraper() {
    return {
        alreadyUsedStyles: {},
        innerDocument: document.implementation.createHTMLDocument(`Inner Document`),
        require: function () {
            console.log(`Require function is empty! You need setup it as vuejsbootstraper.require you function`);
        },
        install(Vue) {
            const self = this; 

            Vue.mixin({
                beforeCreate() {
                    const components = this.$options.components;
    
                    for (let componentName in components) {
                        const component = components[componentName];

                        if (typeof component === `string` && component.startsWith(`remote:`)) { 
                            components[componentName] = () => self.loadComponent.call(self, component.replace(`remote:`, ``));
                        }
                    }
                }
            });
        },
        attachStyles(node, url) {
            if (this.alreadyUsedStyles[url]) return;

            const styleSheet = document.createElement("style");
            
            styleSheet.innerHTML = node.innerHTML;

            document.head.appendChild(styleSheet);

            this.alreadyUsedStyles[url] = true;
        },
        async executeScripts(node) {
            const module = {
                exports: {}
            };

            //TODO: handle syntax errors!!!
            Function(
                `module`,
                `require`,
                node.innerHTML
            ).call(
                module.exports,
                module,
                this.require
            );
            if (module.exports instanceof Function) module.exports = await this.module.exports();

            return module.exports;
        },
        parseTemplate(node) {
            return `${node.innerHTML}`;
        },
        async parseComponent(text, url) {
            const container = this.innerDocument.createElement(`div${(Math.random() * 100)}`);
            container.innerHTML = text;

            let template = ``;
            let moduleExports = null;
            for (let node = container.firstChild; node; node = node.nextSibling) {
                const nodeName = node.nodeName.toLowerCase();
                switch (nodeName) {
                    case `template`:
                        template = this.parseTemplate(node);
                        break;
                    case `script`:
                        moduleExports = await this.executeScripts(node);
                        break;
                    case `style`:
                        this.attachStyles(node, url);
                        break;
                }
            }

            container.innerHTML = ``;
            container.remove();

            return {
                template,
                moduleExports 
            };
        },
        async download(url) {
            if (!url) {
                console.warn(`vuejsbootstraper.download Url not defined!`);
                return;
            }

            try {
                const response = await fetch(url);
                return await response.text();
            } catch (e) {
                console.error(`vuejsbootstraper.download Error while download component ${url} ${e}`);
            }
        },
        async loadComponent(url) {
            const componentText = await this.download(url);
            if (!componentText.length) {
                console.error(`vuejsbootstraper Downloaded component from ${url} is empty!`);
                return;
            }

            const { moduleExports, template } = await this.parseComponent(componentText);

            if (!moduleExports.name) {
                console.error(`vuejsbootstraper Failed while extract component name from ${url}!`);
                return;
            }

            moduleExports.template = template;

            return moduleExports;
        }
    }
}

const Vue2Bootstraper = vuejsbootstraper();
