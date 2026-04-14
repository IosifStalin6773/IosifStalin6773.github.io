module.exports = function(eleventyConfig) {
    // Copy static assets
    eleventyConfig.addPassthroughCopy("src/css");
    eleventyConfig.addPassthroughCopy("src/js");
    eleventyConfig.addPassthroughCopy("public/assets");
    
    // Add date filter for better date formatting
    eleventyConfig.addFilter("date", function(date, format = 'YYYY-MM-DD') {
        const DateTime = require('luxon').DateTime;
        return DateTime.fromJSDate(date).toFormat(format);
    });
    
    // Get pathPrefix for GitHub Pages
    const pathPrefix = process.env.ELEVENTY_PATH_PREFIX || "/IosifStalin6773.github.io/";
    
    // Configuración de directorios
    return {
        dir: {
            input: "src",
            includes: "_includes",
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
