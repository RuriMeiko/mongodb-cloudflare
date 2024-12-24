declare class MongoDB {
    private apiUrl;
    private apiKey;
    private dataSource;
    currentDatabase: string | null;
    currentCollection: string | null;
    private interpose;
    constructor({ apiKey, apiUrl, dataSource, }: {
        apiKey: string;
        apiUrl: string;
        dataSource: any;
    });
    private makeAndAssertConnectionIsValid;
    private request;
    /**
     * Runs an aggregation pipeline and returns the result set of the final stage of the pipeline
     * as an array of documents.
     * @param {Object} parameters - The request parameters.
     * @param {Object} parameters.pipeline - The MongoDB pipeline array.
     * @return {Promise<Array<any>>} - Mảng các tài liệu được trả về.
     */
    aggregate: ({ pipeline }: {
        pipeline: object;
    }) => Promise<Array<any>>;
    /**
     * Delete the first document matching the filter, and return the number of documents deleted.
     * @param {Object} parameters - The request parameters.
     * @param {Object} parameters.filter - The MongoDB filter object.
     * @return {Promise<{ deletedCount: Number }>} - The number of documents deleted.
     */
    deleteOne: ({ filter }: {
        filter: object;
    }) => Promise<{
        deletedCount: number;
    }>;
    /**
     * Delete all documents matching the filter, and return the number of documents deleted.
     * @param {Object} parameters - The request parameters.
     * @param {Object} parameters.filter - The MongoDB filter object.
     * @return {Promise<{ deletedCount: Number }>} - The number of documents deleted.
     */
    deleteMany: ({ filter }: {
        filter: object;
    }) => Promise<{
        deletedCount: number;
    }>;
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
    find: ({ filter, projection, sort, limit, skip, }?: {
        filter?: object;
        projection?: object;
        sort?: object;
        limit?: number;
        skip?: number;
    }) => Promise<Array<any>>;
    /**
     * Tìm và trả về tài liệu đầu tiên phù hợp với bộ lọc.
     * @param {Object} parameters - Các tham số yêu cầu.
     * @param {Object} [parameters.filter] - Đối tượng bộ lọc MongoDB.
     * @param {Object} [parameters.projection] - Đối tượng chiếu MongoDB.
     * @return {Promise<any>} - Tài liệu đầu tiên phù hợp với các tham số.
     */
    findOne: ({ filter, projection }?: {
        filter?: object;
        projection?: object;
    }) => Promise<any>;
    /**
     * Insert a single document. Must be an JSON document.
     * @param {Object} parameters - The request parameters.
     * @param {Object} parameters.document - The JSON document to insert.
     * @return {Promise<{ insertedId: String }>} - The identifier of the inserted document.
     */
    insertOne: (document: object) => Promise<{
        insertedId: string;
    }>;
    /**
     * Insert multiple documents at once. Must be JSON documents.
     * @param {Object} parameters - The request parameters.
     * @param {Object} parameters.documents - The JSON documents to insert.
     * @return {Promise<{ insertedIds: Array<String> }>} - The identifiers of the inserted document.
     */
    insertMany: (documents: object) => Promise<{
        insertedIds: Array<string>;
    }>;
    /**
     * Replace or upsert a single document. Must be an JSON document.
     * @param {Object} parameters - The request parameters.
     * @param {Object} parameters.filter - The MongoDB filter object.
     * @param {Object} parameters.replacement - The JSON document to replace or upsert.
     * @param {Boolean} [parameters.upsert] - If set to true, it will insert the `replacement` document if no documents match the `filter`.
     * @return {Promise<{ matchedCount: Number, modifiedCount: Number, upsertedId: String }>} - The request results.
     */
    replaceOne: ({ filter, replacement, upsert, }: {
        filter: object;
        replacement: object;
        upsert?: boolean;
    }) => Promise<{
        matchedCount: number;
        modifiedCount: number;
        upsertedId: string;
    }>;
    /**
     * Update or upsert a single document. Must be an JSON document.
     * @param {Object} parameters - The request parameters.
     * @param {Object} parameters.filter - The MongoDB filter object.
     * @param {Object} parameters.update - The JSON document to update or upsert.
     * @param {Boolean} [parameters.upsert] - If set to true, it will insert the `replacement` document if no documents match the `filter`.
     * @return {Promise<{ matchedCount: Number, modifiedCount: Number, upsertedId: String }>} - The request results.
     */
    updateOne: ({ filter, update, upsert, }: {
        filter: object;
        update: object;
        upsert?: boolean;
    }) => Promise<{
        matchedCount: number;
        modifiedCount: number;
        upsertedId: string;
    }>;
    /**
     * Update many documents or upsert a single document. Must be an JSON document.
     * @param {Object} parameters - The request parameters.
     * @param {Object} parameters.filter - The MongoDB filter object.
     * @param {Object} parameters.update - The JSON document to update or upsert.
     * @param {Boolean} [parameters.upsert] - If set to true, it will insert the `replacement` document if no documents match the `filter`.
     * @return {Promise<{ matchedCount: Number, modifiedCount: Number, upsertedId: String }>} - The request results.
     */
    updateMany: ({ filter, update, upsert, }: {
        filter: object;
        update: object;
        upsert?: boolean;
    }) => Promise<{
        matchedCount: number;
        modifiedCount: number;
        upsertedId: string;
    }>;
}
export default class Mongodbdb {
    private _mongodb;
    constructor({ apiKey, apiUrl, dataSource, }: {
        apiKey: string;
        apiUrl: string;
        dataSource: any;
    });
    db(database: string): Mongodbcoletion;
}
declare class Mongodbcoletion {
    private _mongodb;
    constructor(tb: MongoDB);
    collection(collection: string): MongoDB;
}
export {};
