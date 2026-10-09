# mongodb-cloudflare

> Kết nối MongoDB từ bên trong Cloudflare Workers, nơi driver chính thức của MongoDB không chạy được.

Workers không có TCP socket như Node, nên `mongodb` driver thông thường không hoạt động. Module nhỏ này gọi tới **MongoDB Atlas Data API** qua `fetch`, cho bạn các thao tác CRUD quen thuộc ngay trong Worker.

## Cài đặt

```bash
npm install mongodb-cloudflare
```

## Sử dụng

```ts
import MongoDB from "mongodb-cloudflare";

const db = new MongoDB({
  apiKey: env.MONGO_API_KEY,      // Data API key
  apiUrl: env.MONGO_API_URL,      // endpoint Data API của cluster
  dataSource: "Cluster0",
  database: "mydb",
});

// Tìm nhiều document
const users = await db.collection("users").find({ active: true });

// Thêm một document
await db.collection("users").insertOne({ name: "Long", age: 21 });

// Cập nhật
await db.collection("users").updateOne({ name: "Long" }, { $set: { age: 22 } });
```

## Vì sao cần nó

| Vấn đề | Cách giải quyết |
| --- | --- |
| Worker không có TCP socket | Dùng Data API qua HTTPS `fetch` |
| Driver `mongodb` không bundle được cho edge | Module thuần, không phụ thuộc Node |
| Cold start nhanh | Không mở connection pool, mỗi query là một request |

## Lấy Data API key

Bật **Data API** trong MongoDB Atlas (App Services → Data API), rồi tạo API key. Xem [tài liệu Atlas Data API](https://www.mongodb.com/docs/atlas/app-services/data-api/).

## License

MIT
