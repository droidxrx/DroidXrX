{
    "targets": [
        {
            "target_name": "JSMeow",
            "cflags!": ["-fno-exceptions"],
            "cflags_cc!": ["-fno-exceptions"],
            "sources": [
                "<!@(node -p \"require('fs').readdirSync('./src/cpp').filter(f=>f.endsWith('.cpp')).map(f=>'src/cpp/'+f).join(' ')\")"
            ],
            'include_dirs': [
                "<!@(node -p \"require('node-addon-api').include\")",
                "<(module_root_dir)/../../configs/node-addon/include",
            ],
            "libraries": [
                "<(module_root_dir)/../../configs/node-addon/lib/glew32s.lib",
                "<(module_root_dir)/../../configs/node-addon/lib/glfw3.lib",
            ],
            'defines': [
                'NAPI_DISABLE_CPP_EXCEPTIONS',
                "NAPI_VERSION=8",
                "GLFW_EXPOSE_NATIVE_WIN32",
                "GLEW_STATIC"
            ]
        }
    ]
}
