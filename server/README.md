# ecommerce-server
Ecommerce API 


**Achmad Wahyu pratama**
*Hacktiv8 RMT-011*

## POST /register
* Request Header
   
    None

* Request Body 

    ```
    { 
        "username": "<body.username>", //string
        "email": "<body.email>", //string
        "password": "<body.password>" //string
    }
    ```

* Success Response:

    * Code: 201
    * Content:
        ```
        { 
            "id": "<User.id>", //integer
            "username": "<User.username>", //string
            "email": "<User.email>" //string
        }
        ```
    
* Error Responses:

    Code:400 EMAIL UNIQUE CONSTRAINT ERROR
    * Content:
        ```
        { "errors": [ { "message": "This email already exist" } ] }
        ```

    Code:400 USERNAME UNIQUE CONSTRAINT ERROR
    * Content:
        ```
        { "errors": [ { "message": "Username already Exist" } ] }
        ```


    Code:400 VALIDATION ERROR
    * Content:
        ```
        { "errors": [ { "message": "<key> can not be blank" } ] }
        ```

    Code: 500 INTERNAL SERVER ERROR
    * Content:
        ```
        { "errors":  { "message": "Internal server error" }  }
        ```


## POST /login
* Request Header
   
    None

* Request Body 

    ```
    { 
        "email": "<body.email>", //string
        "password": "<body.password>" //string
    }
    ```

* Success Response:

    * Code: 200
    * Content:
        ```
        { 
            access_token: "<user.token...>" //string
        }
        ```
    
* Error Responses:

    Code:404 NOT FOUND ERROR (change status to 400:VALIDATION ERROR for security reason)
    * Content:
        ```
        { "errors":  { "message": "invalid email and password" }  }
        ```

    Code:400 VALIDATION ERROR
    * Content:
        ```
        { "errors": [ { "message": "invalid email and password" } ] }
        ```

    Code: 500 INTERNAL SERVER ERROR
    * Content:
        ```
        { "errors":  { "message": "Internal server error" }  }
        ```



## POST /loginAdmin
* Request Header
   
    None

* Request Body 

    ```
    { 
        "email": "<body.email>", //string
        "password": "<body.password>" //string
    }
    ```

* Success Response:

    * Code: 200
    * Content:
        ```
        { 
            access_token: "<user.token...>" //string
        }
        ```
    
* Error Responses:

    Code:404 NOT FOUND ERROR (change status to 400:VALIDATION ERROR for security reason)
    * Content:
        ```
        { "errors":  { "message": "invalid email and password" }  }
        ```

    Code:400 VALIDATION ERROR
    * Content:
        ```
        { "errors": [ { "message": "invalid email and password" } ] }
        ```

    Code: 500 INTERNAL SERVER ERROR
    * Content:
        ```
        { "errors":  { "message": "Internal server error" }  }
        ```


## POST /products
* Request Header
   
    ```
    { 
        "access_token": "<user jwtoken>"//string
    }
    ```

* Request Param
   * none

* Request Body 

    ```
    { 
        "productName": "<req.body.productName>", //string
        "imageUrl": "<req.body.imageUrl>", //string
        "stock": "<req.body.stock> " , //integer
        "price": "<req.body.price>" //integer
    }
    ```
   

* Success Response:

    * Code: 201
    * Content:
        ```
        { 
            "productName": "<req.body.productName>", //string
            "imageUrl": "<req.body.imageUrl>", //string
            "stock": "<req.body.stock> " , //integer
            "price": "<req.body.price>" //integer
        }
        ```

* Error Responses:

    Code:400 VALIDATION ERROR
    * Content:
        ```
        { "errors": [ { "message": "validation message" } ] }
        ```

    Code: 500 INTERNAL SERVER ERROR
    * Content:
        ```
        { "errors":  { "message": "Internal server error" }  }
        ```
        
    Code:403 AUTHENTICATION ERROR
    * Content:
        ```
        { "errors":  { "message": "Need login user" }  }
        ```

    Code:401 AUTHORIZATION ERROR
    * Content:
        ```
        { "errors":  { "message": "You are not authorized" }  }
        ```



## PUT /products/:productsId
* Request Header
   
    ```
    { 
        "access_token": "<user jwtoken>"//string
    }
    ```

* Request Param
   * productId : integer

* Request Body 

    ```
    { 
        "productName": "<req.body.productName>", //string
        "imageUrl": "<req.body.imageUrl>", //string
        "stock": "<req.body.stock> " , //integer
        "price": "<req.body.price>" //integer
    }
    ```
   

* Success Response:

    * Code: 200
    * Content:
        ```
        { 
            "productName": "<req.body.productName>", //string
            "imageUrl": "<req.body.imageUrl>", //string
            "stock": "<req.body.stock> " , //integer
            "price": "<req.body.price>" //integer
        }
        ```

* Error Responses:

    Code:400 VALIDATION ERROR
    * Content:
        ```
        { "errors": [ { "message": "validation message" } ] }
        ```

    Code:404 NOT FOUND ERROR
    * Content:
        ```
        { "errors":  { "message": "Data with id <productId> not found" } }
        ```

    Code: 500 INTERNAL SERVER ERROR
    * Content:
        ```
        { "errors":  { "message": "Internal server error" }  }
        ```
        
    Code:403 AUTHENTICATION ERROR
    * Content:
        ```
        { "errors":  { "message": "Need login user" }  }
        ```

    Code:401 AUTHORIZATION ERROR
    * Content:
        ```
        { "errors":  { "message": "You are not authorized" }  }
        ```


## DELETE /products/:productsId
* Request Header
   
    ```
    { 
        "access_token": "<user jwtoken>"//string
    }
    ```

* Request Param
   * productId : integer

* Request Body 

    ```
    none
    ```
   

* Success Response:

    * Code: 200
    * Content:
        ```
        { 
            "success": {"message": } //string
        }
        ```

* Error Responses:

    Code:400 VALIDATION ERROR
    * Content:
        ```
        { "errors": [ { "message": "success delete product with id <idToDelete>" } ] }
        ```

    Code:404 NOT FOUND ERROR
    * Content:
        ```
        { "errors":  { "message": "Product not found" } }
        ```

    Code: 500 INTERNAL SERVER ERROR
    * Content:
        ```
        { "errors":  { "message": "Internal server error" }  }
        ```
        
    Code:403 AUTHENTICATION ERROR
    * Content:
        ```
        { "errors":  { "message": "Need login user" }  }
        ```

    Code:401 AUTHORIZATION ERROR
    * Content:
        ```
        { "errors":  { "message": "You are not authorized" }  }
        ```



## GET /products
* Request Header
   
    ```
    { 
        "access_token": "<user jwtoken>"//string
    }
    ```

* Request Param
   * none

* Request Body 

    ```
    none
    ```
   

* Success Response:

    * Code: 200
    * Content:
        ```[
            { 
                "id": "<product.id>"
                "productName": "<product.productName>", //string
                "imageUrl": "<product.imageUrl>", //string
                "stock": "<product.stock> " , //integer
                "price": "<product.price>" //integer
            }, ...
        ]
        ```

* Error Responses:

    Code:400 VALIDATION ERROR
    * Content:
        ```
        { "errors": [ { "message": "success delete product with id <idToDelete>" } ] }
        ```

    Code: 500 INTERNAL SERVER ERROR
    * Content:
        ```
        { "errors":  { "message": "Internal server error" }  }
        ```
        
    Code:403 AUTHENTICATION ERROR
    * Content:
        ```
        { "errors":  { "message": "Need login user" }  }
        ```
        

## GET /products/:productId
* Request Header
   
    ```
    { 
        "access_token": "<user jwtoken>"//string
    }
    ```

* Request Param
   * productId //integer

* Request Body 

    ```
    none
    ```
   

* Success Response:

    * Code: 200
    * Content:
        ```
            { 
                "id": "<product.id>"
                "productName": "<product.productName>", //string
                "imageUrl": "<product.imageUrl>", //string
                "stock": "<product.stock> " , //integer
                "price": "<product.price>" //integer
            }      
        ```

* Error Responses:

    Code:400 VALIDATION ERROR
    * Content:
        ```
        { "errors": [ { "message": "success delete product with id <idToDelete>" } ] }
        ```

    Code: 500 INTERNAL SERVER ERROR
    * Content:
        ```
        { "errors":  { "message": "Internal server error" }  }
        ```
        
    Code:403 AUTHENTICATION ERROR
    * Content:
        ```
        { "errors":  { "message": "Need login user" }  }
        ```


## GET /carts/
* Request Header
   
    ```
    { 
        "access_token": "<user jwtoken>"//string
    }
    ```

* Request Param
   * none

* Request Body 

    ```
    none
    ```
   

* Success Response:

    * Code: 200
    * Content:
        ```
        [ 
            {
                "UserId": 2, //integer
                "ProductId": 4, //integer
                "quantity": 1, //integer
                "createdAt": "2021-05-26T18:38:41.718Z", //date
                "updatedAt": "2021-05-26T18:38:41.718Z", //date
                "Product": {
                    "id": 4, //integer
                    "productName": "samsung a72 EDITED", //string
                    "price": 2, //integer
                    "stock": 2, //integer
                    "imageUrl": "dummypucture.com", //string
                    "createdAt": "2021-05-26T13:03:07.183Z", //date
                    "updatedAt": "2021-05-26T13:07:47.322Z" //date
                }
            },...
        ]
        ```

* Error Responses:

    Code:400 VALIDATION ERROR
    * Content:
        ```
        { "errors": [ { "message": "validation message" } ] }
        ```

    Code: 500 INTERNAL SERVER ERROR
    * Content:
        ```
        { "errors":  { "message": "Internal server error" }  }
        ```
        
    Code:403 AUTHENTICATION ERROR
    * Content:
        ```
        { "errors":  { "message": "Need login user" }  }
        ```

    Code:401 AUTHORIZATION ERROR
    * Content:
        ```
        { "errors":  { "message": "You are not authorized" }  }
        ```



## POST /carts/:productId
* Request Header
   
    ```
    { 
        "access_token": "<user jwtoken>"//string
    }
    ```

* Request Param
   * productId : integer

* Request Body 

    ```
    none
    ```
   

* Success Response:
    if there is no cart with specific ProductId
    * Code: 201
    * Content:
        ```        
        {
            "UserId": 2, //integer
            "ProductId": 4, //integer
            "quantity": 1, //integer
            "createdAt": "2021-05-26T18:38:41.718Z", //date
            "updatedAt": "2021-05-26T18:38:41.718Z", //date
            "Product": {
                "id": 4, //integer
                "productName": "samsung a72 EDITED", //string
                "price": 2, //integer
                "stock": 2, //integer
                "imageUrl": "dummypucture.com", //string
                "createdAt": "2021-05-26T13:03:07.183Z", //date
                "updatedAt": "2021-05-26T13:07:47.322Z" //date
            }
        }
    
        ```

    
    if there is cart with specific ProductId
    * Code: 200
    * Content:
        ```        
        {
            "UserId": 2, //integer
            "ProductId": 4, //integer
            "quantity": 2, //integer updated: plus 1
            "createdAt": "2021-05-26T18:38:41.718Z", //date
            "updatedAt": "2021-05-26T18:38:41.718Z", //date
            "Product": {
                "id": 4, //integer
                "productName": "samsung a72 EDITED", //string
                "price": 2, //integer
                "stock": 2, //integer
                "imageUrl": "dummypucture.com", //string
                "createdAt": "2021-05-26T13:03:07.183Z", //date
                "updatedAt": "2021-05-26T13:07:47.322Z" //date
            }
        }
    
        ```


* Error Responses:

    Code:400 VALIDATION ERROR
    * Content:
        ```
        { "errors": [ { "message": "validation message" } ] }
        ```

    Code: 500 INTERNAL SERVER ERROR
    * Content:
        ```
        { "errors":  { "message": "Internal server error" }  }
        ```
        
    Code:403 AUTHENTICATION ERROR
    * Content:
        ```
        { "errors":  { "message": "Need login user" }  }
        ```

    Code:401 AUTHORIZATION ERROR
    * Content:
        ```
        { "errors":  { "message": "You are not authorized" }  }
        ```

## PATCH /carts/:productId
* Request Header
   
    ```
    { 
        "access_token": "<user jwtoken>"//string
    }
    ```

* Request Param
   * productId : integer

* Request Body 

    ```
    {
        method : "add" || "min" //string
    }
    ```
   

* Success Response:
    * Code: 200
    * Content:
        ```        
        {
            "UserId": 2, //integer
            "ProductId": 4, //integer
            "quantity": 2, //integer updated: plus 1 or minus 1
            "createdAt": "2021-05-26T18:38:41.718Z", //date
            "updatedAt": "2021-05-26T18:38:41.718Z", //date
            "Product": {
                "id": 4, //integer
                "productName": "samsung a72 EDITED", //string
                "price": 2, //integer
                "stock": 2, //integer
                "imageUrl": "dummypucture.com", //string
                "createdAt": "2021-05-26T13:03:07.183Z", //date
                "updatedAt": "2021-05-26T13:07:47.322Z" //date
            }
        }
    
        ```
    
    if quantity is 1 and method is min
    * Code: 200
    * Content:
        ```        
        {
            success: {
                message: `Cart with product ${productId} successfully deleted`
                }
        }
    
        ```


* Error Responses:

    Code:400 VALIDATION ERROR
    * Content:
        ```
        { "errors": [ { "message": "validation message" } ] }
        ```

    Code: 500 INTERNAL SERVER ERROR
    * Content:
        ```
        { "errors":  { "message": "Internal server error" }  }
        ```
        
    Code:403 AUTHENTICATION ERROR
    * Content:
        ```
        { "errors":  { "message": "Need login user" }  }
        ```

    Code:401 AUTHORIZATION ERROR
    * Content:
        ```
        { "errors":  { "message": "You are not authorized" }  }
        ```



## PATCH /carts/:productId
* Request Header
   
    ```
    { 
        "access_token": "<user jwtoken>"//string
    }
    ```

* Request Param
   * productId : integer

* Request Body 

    ```
    none
    ```
   

* Success Response:
    * Code: 200
    * Content:
        ```        
        {
            success: {
                message: `Cart with product ${productId} successfully deleted`
                }
        }
    
        ```


* Error Responses:

    Code:400 VALIDATION ERROR
    * Content:
        ```
        { "errors": [ { "message": "validation message" } ] }
        ```

    Code: 500 INTERNAL SERVER ERROR
    * Content:
        ```
        { "errors":  { "message": "Internal server error" }  }
        ```
        
    Code:403 AUTHENTICATION ERROR
    * Content:
        ```
        { "errors":  { "message": "Need login user" }  }
        ```

    Code:401 AUTHORIZATION ERROR
    * Content:
        ```
        { "errors":  { "message": "You are not authorized" }  }
        ```
