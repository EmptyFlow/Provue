`use strict`;

function vuejsbootstraper() {
    return {
        alreadyUsedStyles: {},
        innerDocument: document.implementation.createHTMLDocument(`Inner Document`),
        require: {}, // user need specify it directly!!!
        downloadingQueue: {},
        globalComponents: {},
        globalComponentsUrls: {},
        application: null, // Vue.js app instance it need for supporting Vue3
        attachStyles(node, url) {
            if (this.alreadyUsedStyles[url]) return;

            const styleSheet = document.createElement("style");
            
            styleSheet.innerHTML = node.innerHTML;

            document.head.appendChild(styleSheet);

            this.alreadyUsedStyles[url] = true;
        },
        async executeScripts(node, url) {
            const module = {
                exports: {}
            };

            // supporting export in ES6 module style (as sugar)
            const script = node.innerHTML.replace(`export default `, `module.exports = `);

            //TODO: handle syntax errors!!!
            const componentFunction = Function(
                `module`,
                `dependency`,
                `globalComponent`,
                `globalComponents`,
                `remoteComponent`,
                `vueApplication`,
                `vueVersion`,
                `vueInstance`,
                script
            );            
            componentFunction.displayName = url.replace(`http://`, ``).replace(`https://`, ``).replace(/\.\./g, ``).replace(/\//g, ``);
            componentFunction.call(
                module.exports,
                module,                
                this.require,
                this.loadComponentGlobally.bind(this),
                this.loadComponentsGlobally.bind(this),
                this.loadComponent.bind(this),
                this.application,
                this.application ? `3` : `2`,
                Vue
            );
            if (module.exports instanceof Function) module.exports = await module.exports();

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
                        moduleExports = await this.executeScripts(node, url);
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
        async innerDownload(url) {
            const response = await fetch(url);
            return await response.text();
        },
        async download(url) {
            if (!url) {
                console.warn(`vuejsbootstraper.download Url not defined!`);
                return;
            }

            // resolve batching issue
            if (url in this.downloadingQueue) return await this.downloadingQueue[url];

            try {
                this.downloadingQueue[url] = this.innerDownload(url);
                const content = await this.downloadingQueue[url];
                return content;
            } catch (e) {
                console.error(`vuejsbootstraper.download Error while download component ${url} ${e}`);
                delete this.downloadingQueue[url];
            }
        },
        async loadComponent(url) {
            const componentText = await this.download(url);
            if (!componentText.length) {
                console.error(`vuejsbootstraper downloaded component from ${url} is empty!`);
                return;
            }

            const { moduleExports, template } = await this.parseComponent(componentText, url);

            if (!moduleExports.name) {
                console.error(`vuejsbootstraper failed while extract component name from ${url}!`);
                return;
            }

            moduleExports.template = template;

            return moduleExports;
        },
        async loadComponentGlobally(url) {
            if (this.globalComponentsUrls[url]) return;

            const component = await this.loadComponent(url);
            if (!component) return;

            if (this.globalComponents[component.name]) return;

            if (this.application) {
                this.application.component(component.name, component);
            } else {
                Vue.component(component.name, component);
            }

            this.globalComponentsUrls[url] = true;
            this.globalComponents[component.name] = true;
        },
        loadComponentsGlobally(...urls) {
            return Promise.all(urls.map(url => this.loadComponentGlobally(url)));
        }
    }
}

const VueBootstraper = vuejsbootstraper();

// common.js export style
if (typeof exports !== `undefined`) exports = VueBootstraper;