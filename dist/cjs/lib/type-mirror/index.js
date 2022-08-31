"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeMirror = void 0;
var TypeMirror = (function () {
    function TypeMirror(type, elementType) {
        this.type = type;
        this.elementType = elementType;
        this.field = '';
        var e = elementType();
        if (e) {
            e.parent = this;
        }
    }
    TypeMirror.createSetMirror = function (type) {
        return new TypeMirror(function () { return Set; }, function () {
            return type instanceof TypeMirror ? type : TypeMirror.createObjectMirror(type);
        });
    };
    TypeMirror.createMapMirror = function (type) {
        return new TypeMirror(function () { return Map; }, function () {
            return type instanceof TypeMirror ? type : TypeMirror.createObjectMirror(type);
        });
    };
    TypeMirror.createPromiseMirror = function (type) {
        return new TypeMirror(function () { return Promise; }, function () {
            return type instanceof TypeMirror ? type : TypeMirror.createObjectMirror(type);
        });
    };
    TypeMirror.createArrayMirror = function (type) {
        return new TypeMirror(function () { return Array; }, function () {
            return type instanceof TypeMirror ? type : TypeMirror.createObjectMirror(type);
        });
    };
    TypeMirror.createObjectMirror = function (type) {
        return new TypeMirror(function () { return type; }, function () { return undefined; });
    };
    TypeMirror.from = function (type, elementType) {
        return new TypeMirror(type, elementType ? elementType : function () { return undefined; });
    };
    return TypeMirror;
}());
exports.TypeMirror = TypeMirror;
