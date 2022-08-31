"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypedSet = void 0;
var class_mirror_1 = require("@quick-toolkit/class-mirror");
var type_mirror_1 = require("../../type-mirror");
var typed_metadata_1 = require("../../typed-metadata");
var typed_decorate_1 = require("../../typed-decorate");
function TypedSet() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    var a = args[0], _a = args[1], b = _a === void 0 ? {} : _a;
    if (args.length === 1) {
        if (typeof a === 'function' || a instanceof type_mirror_1.TypeMirror) {
            return class_mirror_1.PropertyMirror.createDecorator(new typed_decorate_1.TypedDecorate(typed_metadata_1.TypedMetadata.create(a instanceof type_mirror_1.TypeMirror ? a : type_mirror_1.TypeMirror.createSetMirror(a), {})));
        }
        else {
            return class_mirror_1.PropertyMirror.createDecorator(new typed_decorate_1.TypedDecorate(typed_metadata_1.TypedMetadata.create(type_mirror_1.TypeMirror.createObjectMirror(Set), a)));
        }
    }
    return class_mirror_1.PropertyMirror.createDecorator(new typed_decorate_1.TypedDecorate(typed_metadata_1.TypedMetadata.create(a instanceof type_mirror_1.TypeMirror ? a : type_mirror_1.TypeMirror.createSetMirror(a), b)));
}
exports.TypedSet = TypedSet;
