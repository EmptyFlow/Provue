`use strict`;

function dependencyResolver() {
    return {
        globalAliases: {
        },
        dependencyHash: {
        },
        loadedStyles: {
        },
        async resolveScripts(name, scriptType = `commonjs`) {
            if (this.globalAliases[name]) return this.globalAliases[name];
            if (this.dependencyHash[name]) return this.dependencyHash[name];

            const response = await fetch(name);
            const script = await response.text();

            if (scriptType === `commonjs`) {
                const module = { exports: {} };
                Function("exports", "require", "module", script).call(module.exports, module.exports, dependency, module);
                this.dependencyHash[name] = module.exports;

                return module.exports;
            }

            //TODO: add umd and other types

        },
        resolveStyles(url) {
            const isCache = this.loadedStyles[url];
            if (isCache) return isCache;
        
            const link = document.createElement("link");           
            link.href = url;
            link.rel = `stylesheet`;

            document.head.appendChild(link);

            this.loadedStyles[url] = true;
        }
    };
}

const DependencyResolver = dependencyResolver();