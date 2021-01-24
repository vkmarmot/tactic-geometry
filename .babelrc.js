module.exports = {
    presets: [
        [
            "@babel/preset-env",
            {
                "modules": "auto",
                "targets": {
                    "firefox": "40",
                    "chrome": "17",
                    "ie": "11"
                },
                "useBuiltIns": false,
                "loose": true
            }
        ],
        "@babel/preset-typescript",
    ]
}
