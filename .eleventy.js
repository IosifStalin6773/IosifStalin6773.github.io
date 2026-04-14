module.exports = function(eleventyConfig) {
    // Copy static assets (only from src, eliminate duplicates)
    eleventyConfig.addPassthroughCopy("src/css");
    eleventyConfig.addPassthroughCopy("src/js");
    eleventyConfig.addPassthroughCopy("src/assets");
    eleventyConfig.addPassthroughCopy("robots.txt");
    
    // Minify CSS in production
    if (process.env.NODE_ENV === 'production') {
        eleventyConfig.addTransform("cssmin", function(content, outputPath) {
            if (outputPath && outputPath.endsWith(".css")) {
                return content.replace(/\s+/g, ' ').trim();
            }
            return content;
        });
    }
    
    // Generate sitemap
    eleventyConfig.addCollection("sitemap", function(collection) {
        return collection.getAll().filter(item => 
            !item.data.sitemapExclude && item.url
        );
    });
    
    // Get pathPrefix for GitHub Pages
    const pathPrefix = process.env.ELEVENTY_PATH_PREFIX || "/IosifStalin6773.github.io/";
    
    // Add date filter for better date formatting
    eleventyConfig.addFilter("date", function(date, format = 'YYYY-MM-DD') {
        const DateTime = require('luxon').DateTime;
        return DateTime.fromJSDate(date).toFormat(format);
    });
    
    // Add url filter for GitHub Pages path prefix
    eleventyConfig.addFilter("url", function(path) {
        if (path.startsWith('/')) {
            return pathPrefix.replace(/\/$/, '') + path;
        }
        return path;
    });
    
    // Configuración de directorios
    return {
        dir: {
            input: "src",
            includes: "components",
            data: "_data",
            output: "public"
        },
        
        // Template formats
        templateFormats: ["njk", "md", "html"],
        
        // Markdown processing
        markdownTemplateEngine: "njk",
        htmlTemplateEngine: "njk",
        dataTemplateEngine: "njk",
        
        // Passthrough copy for static assets
        passthroughFileCopy: true,
        
        // Path prefix for GitHub Pages
        pathPrefix: pathPrefix,
        
        // Configuración de colecciones
        collections: {
            blog: function(collection) {
                return collection.getFilteredByGlob("src/blog/*.md")
                    .sort((a, b) => b.date - a.date);
            }
        }
    };
};
