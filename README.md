# Microservicio Question

## Indices

- [Create question - Microservicio Questions](#1-create-question---microservicio-questions)
- [Delete question - Microservicio Quesions](#2-delete-question---microservicio-quesions)
- [Edit question - Microservicio Questions](#3-edit-question---microservicio-questions)
- [Get questions of article - Microservicio Questions](#4-get-questions-of-article---microservicio-questions)

---

### 1. Create question - Microservicio Questions

**_Endpoint:_**

```bash
Method: POST
Type: RAW
URL: http://localhost:3002/v1/articles
```

**_Headers:_**

| Key           | Value          | Description |
| ------------- | -------------- | ----------- |
| Authorization | bearer {{jwt}} |             |

**_Body:_**

```js
{
    "name": "juanse",
    "description": "articulo juanse",
    "image": "hjhhewwwwwwwwwwwwwwwwwwwwwwewwej",
    "price": 100,
    "stock": 100
}
```

### 2. Delete question - Microservicio Quesions

**_Endpoint:_**

```bash
Method: DELETE
Type:
URL: http://localhost:3005/v1/questions/61943e8f9ab33cb981a9ba29
```

**_Headers:_**

| Key           | Value          | Description |
| ------------- | -------------- | ----------- |
| Authorization | bearer {{jwt}} |             |

### 3. Edit question - Microservicio Questions

**_Endpoint:_**

```bash
Method: PUT
Type: RAW
URL: http://localhost:3005/v1/questions
```

**_Headers:_**

| Key           | Value          | Description |
| ------------- | -------------- | ----------- |
| Authorization | bearer {{jwt}} |             |

**_Body:_**

```js
{
    "id":"61943eb04ebdcc279df8138c",
    "description":"¿Cual es el precio juanse te amo?"
}
```

### 4. Get questions of article - Microservicio Questions

**_Endpoint:_**

```bash
Method: GET
Type:
URL: http://localhost:3005/v1/questions/619433da10f225e4c18232fc
```

---

[Back to top](#microservicios-question)
