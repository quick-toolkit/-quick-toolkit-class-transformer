"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypedMetadata = void 0;
var type_mirror_1 = require("../type-mirror");
var TypedMetadata = (function () {
    function TypedMetadata(type, options) {
        this.type = type;
        this.options = options;
        if (type) {
            type.metadata = this;
        }
    }
    TypedMetadata.mergeRule = function (rules) {
        if (Array.isArray(rules)) {
            return rules.map(function (o) {
                if (typeof o === 'string') {
                    return {
                        type: o,
                    };
                }
                return o;
            });
        }
        else if (typeof rules === 'object' && rules !== null) {
            return [rules];
        }
        return [
            {
                type: rules,
            },
        ];
    };
    TypedMetadata.create = function (type, options) {
        return new TypedMetadata(type instanceof type_mirror_1.TypeMirror ? type : type_mirror_1.TypeMirror.createObjectMirror(type), options);
    };
    return TypedMetadata;
}());
exports.TypedMetadata = TypedMetadata;
