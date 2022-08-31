"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Typed = void 0;
var class_mirror_1 = require("@quick-toolkit/class-mirror");
var type_mirror_1 = require("../../type-mirror");
var typed_metadata_1 = require("../../typed-metadata");
var typed_decorate_1 = require("../../typed-decorate");
var any_1 = require("../../any");
function Typed(options) {
    if (options === void 0) { options = {}; }
    return class_mirror_1.PropertyMirror.createDecorator(new typed_decorate_1.TypedDecorate(typed_metadata_1.TypedMetadata.create(type_mirror_1.TypeMirror.createObjectMirror(any_1.Any), options)));
}
exports.Typed = Typed;
