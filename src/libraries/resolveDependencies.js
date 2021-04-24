`use strict`;

function dependencyResolver() {
    return {
        globalAliases: {
        },
        dependencyHash: {
        },
        loadedStyles: {
        },
        async loadScript(name, alias) {
            if (this.globalAliases[name]) return this.globalAliases[name];
            if (this.dependencyHash[name]) return this.dependencyHash[name];

            const response = await fetch(name);
            const script = await response.text();

            const module = { exports: {} };
            Function(`exports`, `require`, `module`, script).call(module.exports, module.exports, dependencyResolver, module);
            if (alias) {
                this.globalAliases[alias] = module.exports;
            } else {
                this.dependencyHash[name] = module.exports;
            }

            return module.exports;
            
            //TODO: add amd support
        },
        resolveStyles(url) {
            const isCache = this.loadedStyles[url];
            if (isCache) return isCache;
        
            const link = document.createElement(`link`);
            link.href = url;
            link.rel = `stylesheet`;

            document.head.appendChild(link);

            this.loadedStyles[url] = true;
        }
    };
}

const DependencyResolver = dependencyResolver();