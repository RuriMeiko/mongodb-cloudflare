"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
class MongodbError extends Error {
    constructor({ error, error_code, link }, status = 500) {
        super(error);
        this.name = "MongodbError";
        this.status = status;
        if (error_code)
            this.title = error_code;
        if (link)
            this.meta = { link };
    }
}
class MongoDB {
    constructor({ apiKey, apiUrl, dataSource, }) {
        this.currentDatabase = null;
        this.currentCollection = null;
        /**
         * Runs an aggregation pipeline and returns the result set of the final stage of the pipeline
         * as an array of documents.
         * @param {Object} parameters - The request parameters.
         * @param {Object} parameters.pipeline - The MongoDB pipeline array.
         * @return {Promise<Array<any>>} - Mảng các tài liệu được trả về.
         */
        this.aggregate = (_a) => __awaiter(this, [_a], void 0, function* ({ pipeline }) {
            const { documents } = yield this.request("aggregate", { pipeline });
            return documents;
        });
        /**
         * Delete the first document matching the filter, and return the number of documents deleted.
         * @param {Object} parameters - The request parameters.
         * @param {Object} parameters.filter - The MongoDB filter object.
         * @return {Promise<{ deletedCount: Number }>} - The number of documents deleted.
         */
        this.deleteOne = (_a) => __awaiter(this, [_a], void 0, function* ({ filter }) { return this.request("deleteOne", { filter }); });
        /**
         * Delete all documents matching the filter, and return the number of documents deleted.
         * @param {Object} parameters - The request parameters.
         * @param {Object} parameters.filter - The MongoDB filter object.
         * @return {Promise<{ deletedCount: Number }>} - The number of documents deleted.
         */
        this.deleteMany = (_a) => __awaiter(this, [_a], void 0, function* ({ filter }) { return this.request("deleteMany", { filter }); });
        /**
         /**
         * Tìm và trả về một danh sách các tài liệu.
         * @param {Object} parameters - Các tham số yêu cầu.
         * @param {Object} [parameters.filter] - Đối tượng bộ lọc MongoDB.
         * @param {Object} [parameters.projection] - Đối tượng chiếu MongoDB.
         * @param {Object} [parameters.sort] - Đối tượng sắp xếp MongoDB, ví dụ: `{ completed: -1 }`.
         * @param {Number} [parameters.limit] - Số lượng tài liệu tối đa để trả về.
         * @param {Number} [parameters.skip] - Số lượng tài liệu để bỏ qua, còn được gọi là vị trí con trỏ.
         * @return {Promise<Array<any>>} - Mảng các tài liệu phù hợp với các tham số.
         */
        this.find = (...args_1) => __awaiter(this, [...args_1], void 0, function* ({ filter, projection, sort, limit, skip, } = {
            filter: {},
            projection: {},
            sort: undefined,
            limit: undefined,
            skip: undefined,
        }) {
            const { documents } = yield this.request("find", {
                filter,
                projection,
                sort,
                limit,
                skip,
            });
            return documents;
        });
        /**
         * Tìm và trả về tài liệu đầu tiên phù hợp với bộ lọc.
         * @param {Object} parameters - Các tham số yêu cầu.
         * @param {Object} [parameters.filter] - Đối tượng bộ lọc MongoDB.
         * @param {Object} [parameters.projection] - Đối tượng chiếu MongoDB.
         * @return {Promise<any>} - Tài liệu đầu tiên phù hợp với các tham số.
         */
        this.findOne = (...args_1) => __awaiter(this, [...args_1], void 0, function* ({ filter, projection } = {
            filter: {},
            projection: {},
        }) {
            const { document } = yield this.request("findOne", {
                filter,
                projection,
            });
            // Trả về tài liệu đầu tiên nếu có
            return document;
        });
        /**
         * Insert a single document. Must be an JSON document.
         * @param {Object} parameters - The request parameters.
         * @param {Object} parameters.document - The JSON document to insert.
         * @return {Promise<{ insertedId: String }>} - The identifier of the inserted document.
         */
        this.insertOne = (document) => __awaiter(this, void 0, void 0, function* () { return this.request("insertOne", { document }); });
        /**
         * Insert multiple documents at once. Must be JSON documents.
         * @param {Object} parameters - The request parameters.
         * @param {Object} parameters.documents - The JSON documents to insert.
         * @return {Promise<{ insertedIds: Array<String> }>} - The identifiers of the inserted document.
         */
        this.insertMany = (documents) => __awaiter(this, void 0, void 0, function* () { return this.request("insertMany", { documents }); });
        /**
         * Replace or upsert a single document. Must be an JSON document.
         * @param {Object} parameters - The request parameters.
         * @param {Object} parameters.filter - The MongoDB filter object.
         * @param {Object} parameters.replacement - The JSON document to replace or upsert.
         * @param {Boolean} [parameters.upsert] - If set to true, it will insert the `replacement` document if no documents match the `filter`.
         * @return {Promise<{ matchedCount: Number, modifiedCount: Number, upsertedId: String }>} - The request results.
         */
        this.replaceOne = (_a) => __awaiter(this, [_a], void 0, function* ({ filter, replacement, upsert, }) {
            return this.request("replaceOne", {
                filter,
                replacement,
                upsert,
            });
        });
        /**
         * Update or upsert a single document. Must be an JSON document.
         * @param {Object} parameters - The request parameters.
         * @param {Object} parameters.filter - The MongoDB filter object.
         * @param {Object} parameters.update - The JSON document to update or upsert.
         * @param {Boolean} [parameters.upsert] - If set to true, it will insert the `replacement` document if no documents match the `filter`.
         * @return {Promise<{ matchedCount: Number, modifiedCount: Number, upsertedId: String }>} - The request results.
         */
        this.updateOne = (_a) => __awaiter(this, [_a], void 0, function* ({ filter, update, upsert, }) {
            return this.request("updateOne", {
                filter,
                update,
                upsert,
            });
        });
        /**
         * Update many documents or upsert a single document. Must be an JSON document.
         * @param {Object} parameters - The request parameters.
         * @param {Object} parameters.filter - The MongoDB filter object.
         * @param {Object} parameters.update - The JSON document to update or upsert.
         * @param {Boolean} [parameters.upsert] - If set to true, it will insert the `replacement` document if no documents match the `filter`.
         * @return {Promise<{ matchedCount: Number, modifiedCount: Number, upsertedId: String }>} - The request results.
         */
        this.updateMany = (_a) => __awaiter(this, [_a], void 0, function* ({ filter, update, upsert, }) {
            return this.request("updateMany", {
                filter,
                update,
                upsert,
            });
        });
        if (!apiUrl || !apiKey)
            throw new MongodbError("The `apiUrl` and `apiKey` must always be set.");
        this.apiUrl = apiUrl;
        this.apiKey = apiKey;
        this.dataSource = dataSource;
        this.interpose = (passThrough) => passThrough;
    }
    makeAndAssertConnectionIsValid() {
        if (!this.dataSource || !this.currentDatabase || !this.currentCollection) {
            throw new MongodbError("Database and collection must be set before calling this method.");
        }
        return {
            dataSource: this.dataSource,
            database: this.currentDatabase,
            collection: this.currentCollection,
        };
    }
    request(name, parameters) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const { body } = this.interpose({
                name,
                body: Object.assign(Object.assign({}, (parameters || {})), this.makeAndAssertConnectionIsValid()),
            });
            const response = yield fetch(this.apiUrl + "/action/" + name, {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    "access-control-request-headers": "*",
                    "api-key": this.apiKey,
                },
                body: JSON.stringify(body),
            });
            const status = response.status || response.statusCode || 500;
            if (status === 200 || status === 201) {
                return response.json();
            }
            else {
                // Errors that are at the Data API service level, for example authentication
                // and pathname validation, return a JSON error object. Errors that are at
                // the database level, for example errors returned from the `insertOne` call,
                // return a plaintext error string.
                let error = ((_a = response.headers["content-type"]) === null || _a === void 0 ? void 0 : _a.includes("application/json"))
                    ? yield response.json()
                    : yield response.text();
                if (typeof error === "string") {
                    if (error.includes("{")) {
                        try {
                            error = JSON.parse(error);
                        }
                        catch (ignore) {
                            // not valid JSON
                            error = { error };
                        }
                    }
                    else {
                        // also not valid JSON, probably plaintext
                        error = { error };
                    }
                }
                return Promise.reject(new MongodbError(error, status));
            }
        });
    }
}
class Mongodbdb {
    constructor({ apiKey, apiUrl, dataSource, }) {
        this._mongodb = new MongoDB({
            apiKey,
            apiUrl,
            dataSource,
        });
    }
    db(database) {
        this._mongodb.currentDatabase = database;
        return new Mongodbcoletion(this._mongodb);
    }
}
exports.default = Mongodbdb;
class Mongodbcoletion {
    constructor(tb) {
        this._mongodb = tb;
    }
    collection(collection) {
        this._mongodb.currentCollection = collection;
        return this._mongodb;
    }
}
