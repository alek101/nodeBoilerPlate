define({ "api": [
  {
    "type": "get",
    "url": "/confirm-email/:verificationToken",
    "title": "Confirm email",
    "version": "1.0.0",
    "name": "Confirm_Email",
    "description": "<h2>Allowed roles:</h2> <ul> <li>SuperAdmin</li> <li>User</li> </ul>",
    "group": "Auth",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "verificationToken",
            "description": "<p>verificationToken</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"message\": \"Successfully confirmed email\",\n   \"token\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGVlY2ExYzRiZGM2MzBmMzdiNTMzYzMiLCJpYXQiOjE2MjYyNjQ5NTgsImV4cCI6MTYyNjMwODE1OH0.Rt2FnBS7l-mmji9zwCY9J5OpeKD0DmGCbfsh9inJ6Do\",\n   \"results\": {\n       \"_id\": \"60eeca1c4bdc630f37b533c3\",\n       \"role\": \"User\",\n       \"isActive\": true,\n       \"isDeleted\": false,\n       \"allowNotifications\": true,\n       \"favorites\": [],\n       \"ratingsSum\": 0,\n       \"ratingsQuantity\": 0,\n       \"email\": \"test@gmail.com\",\n       \"name\": \"test\",\n       \"permissionToReviews\": [],\n       \"createdAt\": \"2021-07-14T11:27:24.159Z\",\n       \"updatedAt\": \"2021-07-14T12:10:31.404Z\",\n       \"__v\": 0\n   }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "C:/xampp/htdocs/nodeBoilerPlate/components/auth/authController.js",
    "groupTitle": "Auth",
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "optional": false,
            "field": "MissingParamsError",
            "description": "<p>Error Code <code>2</code> Missing parameters</p>"
          }
        ],
        "404": [
          {
            "group": "404",
            "optional": false,
            "field": "UserNotFound",
            "description": "<p>Error Code <code>28</code> User was not found</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"message\": \"Missing parameters\",\n  \"status\": 400,\n  \"errorCode\": 2,\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"message\": \"User was not found\",\n  \"status\": 404,\n  \"errorCode\": 28,\n }",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "post",
    "url": "/google-auth",
    "title": "Sign in with Google Auth",
    "version": "1.0.0",
    "name": "Sign-in-with-Google-Auth",
    "group": "Auth",
    "description": "<h2>Allowed roles:</h2> <ul> <li>SuperAdmin</li> <li>User</li> </ul>",
    "parameter": {
      "fields": {
        "body": [
          {
            "group": "body",
            "type": "String",
            "optional": false,
            "field": "idToken",
            "description": "<p>ID token</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": " HTTP/1.1 200 OK\n {\n  \"message\": \"Successfully signed in\",\n  \"token\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGVkN2RkYjY4NWE5MDRhNGI0NTgwNGUiLCJpYXQiOjE2MjYxNzY5ODcsImV4cCI6MTYyNjIyMDE4N30.J45AfO9Vvewl3NeWcSek49fKBVnzafg1-skhsBQBFXc\",\n  \"results\": {\n    \"role\": \"User\",\n    \"isActive\": true,\n    \"allowNotifications\": true,\n    \"favorites\": [],\n    \"ratingsSum\": 0,\n    \"ratingsQuantity\": 0,\n    \"_id\": \"60ed7ddb685a904a4b45804e\",\n    \"googleId\": \"118354505645562085051\",\n    \"name\": \"Partajmer\",\n    \"email\": \"partajmer@gmail.com\",\n    \"profilePicture\": \"https://lh3.googleusercontent.com/a/AATXAJwg6o2WZrvuv4M5nVmHuaie2VzgJQsIfAI-fpaq=s96-c\",\n    \"password\": \"$2b$10$3eZmmuZNv7HJRrt8KXXXfuhJjcwe5bkmvRHXgNYAF6DJ3ymw0974i\",\n    \"permissionToReviews\": [],\n    \"createdAt\": \"2021-07-13T11:49:47.732Z\",\n    \"updatedAt\": \"2021-07-13T11:49:47.732Z\",\n    \"__v\": 0\n  }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "C:/xampp/htdocs/nodeBoilerPlate/components/auth/authController.js",
    "groupTitle": "Auth",
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "optional": false,
            "field": "MissingParamsError",
            "description": "<p>Error Code <code>2</code> Missing parameters</p>"
          }
        ],
        "404": [
          {
            "group": "404",
            "optional": false,
            "field": "UserNotFound",
            "description": "<p>Error Code <code>28</code> User was not found</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"message\": \"Missing parameters\",\n  \"status\": 400,\n  \"errorCode\": 2,\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"message\": \"User was not found\",\n  \"status\": 404,\n  \"errorCode\": 28,\n }",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "post",
    "url": "/signin",
    "title": "Sign in User",
    "version": "1.0.0",
    "name": "Sign_in",
    "description": "<p>Sign in User</p>",
    "group": "Auth",
    "parameter": {
      "fields": {
        "body": [
          {
            "group": "body",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email</p>"
          },
          {
            "group": "body",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Password</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"message\": \"Successfully signed in\",\n   \"token\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGVlY2ExYzRiZGM2MzBmMzdiNTMzYzMiLCJpYXQiOjE2MjYyNjM1NDksImV4cCI6MTYyNjMwNjc0OX0.B6tta7coiDKRQ0KJESdjJc7x6cUNf5oDfBD4Zaz60FE\",\n   \"results\": {\n       \"role\": \"User\",\n       \"isActive\": true,\n       \"isDeleted\": false,\n       \"allowNotifications\": true,\n       \"favorites\": [],\n       \"ratingsSum\": 0,\n       \"ratingsQuantity\": 0,\n       \"_id\": \"60eeca1c4bdc630f37b533c3\",\n       \"email\": \"test@gmail.com\",\n       \"name\": \"test\",\n       \"verificationCode\": \"eWClh8gZh1rK8A3f0SgqsNjWUlGQAKn\",\n       \"permissionToReviews\": [],\n       \"createdAt\": \"2021-07-14T11:27:24.159Z\",\n       \"updatedAt\": \"2021-07-14T11:27:24.159Z\",\n       \"__v\": 0,\n   }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "C:/xampp/htdocs/nodeBoilerPlate/components/auth/authController.js",
    "groupTitle": "Auth",
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "optional": false,
            "field": "MissingParamsError",
            "description": "<p>Error Code <code>2</code> Missing parameters</p>"
          },
          {
            "group": "400",
            "optional": false,
            "field": "ValidEmailError",
            "description": "<p>Error Code <code>9</code> Please fill a valid email address</p>"
          }
        ],
        "401": [
          {
            "group": "401",
            "optional": false,
            "field": "CredentialsError",
            "description": "<p>Error Code <code>8</code> Wrong credentials</p>"
          }
        ],
        "403": [
          {
            "group": "403",
            "optional": false,
            "field": "Forbidden",
            "description": "<p>Error Code <code>5</code> Insufficient privileges</p>"
          }
        ],
        "404": [
          {
            "group": "404",
            "optional": false,
            "field": "UserNotFound",
            "description": "<p>Error Code <code>28</code> User was not found</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"message\": \"Missing parameters\",\n  \"status\": 400,\n  \"errorCode\": 2,\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"message\": \"Please fill a valid email address\",\n  \"status\": 400,\n  \"errorCode\": 9,\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"message\": \"User was not found\",\n  \"status\": 404,\n  \"errorCode\": 28,\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Forbidden\n{\n  \"message\": \"Insufficient privileges\",\n  \"status\": 403,\n  \"errorCode\": 5,\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"Wrong credentials\",\n  \"status\": 401,\n  \"errorCode\": 8,\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "post",
    "url": "/signup",
    "title": "Signup User",
    "version": "1.0.0",
    "name": "Signup",
    "description": "<p>Create new User</p>",
    "group": "Auth",
    "parameter": {
      "fields": {
        "body": [
          {
            "group": "body",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name</p>"
          },
          {
            "group": "body",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email</p>"
          },
          {
            "group": "body",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Password</p>"
          },
          {
            "group": "body",
            "type": "String",
            "optional": false,
            "field": "confirmedPassword",
            "description": "<p>Password</p>"
          },
          {
            "group": "body",
            "type": "String",
            "optional": true,
            "field": "pib",
            "description": "<p>pib</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n \"message\": \"Successfully signed up\",\n   }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "C:/xampp/htdocs/nodeBoilerPlate/components/auth/authController.js",
    "groupTitle": "Auth",
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "optional": false,
            "field": "MissingParamsError",
            "description": "<p>Error Code <code>2</code> Missing parameters</p>"
          },
          {
            "group": "400",
            "optional": false,
            "field": "ShortPassword",
            "description": "<p>Error Code <code>14</code> Password must have 6 characters'</p>"
          },
          {
            "group": "400",
            "optional": false,
            "field": "ValidEmailError",
            "description": "<p>Error Code <code>9</code> Please fill a valid email address</p>"
          },
          {
            "group": "400",
            "optional": false,
            "field": "PasswordsUnmatching",
            "description": "<p>Error Code <code>13</code> Password and confirmed password are not matching</p>"
          },
          {
            "group": "400",
            "optional": false,
            "field": "MailFailed",
            "description": "<p>Error Code <code>24</code> Mail was not sent</p>"
          }
        ],
        "406": [
          {
            "group": "406",
            "optional": false,
            "field": "DuplicateEmailError",
            "description": "<p>Error Code <code>10</code> This email address is already registered</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"message\": \"Missing parameters\",\n  \"status\": 400,\n  \"errorCode\": 2,\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"message\": \"Password must have 6 characters'\",\n  \"status\": 400,\n  \"errorCode\": 14,\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"message\": \"Please fill a valid email address\",\n  \"status\": 400,\n  \"errorCode\": 9,\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 406 Not Acceptable\n{\n  \"message\": \"This email address is already registered\",\n  \"status\": 406,\n  \"errorCode\": 10,\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"message\": \"Password and confirmed password are not matching\",\n  \"status\": 400,\n  \"errorCode\": 13,\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"message\": \"Mail was not sent\",\n  \"status\": 400,\n  \"errorCode\": 24,\n }",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "post",
    "url": "/change-password",
    "title": "Change password",
    "version": "1.0.0",
    "name": "changePassword",
    "description": "<p>Changing password for logged in auth</p>",
    "group": "Auth",
    "parameter": {
      "fields": {
        "body": [
          {
            "group": "body",
            "type": "String",
            "optional": false,
            "field": "oldPassword",
            "description": "<p>User's old password</p>"
          },
          {
            "group": "body",
            "type": "String",
            "optional": false,
            "field": "newPassword",
            "description": "<p>User's new password to set to</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"message\": \"Password successfully updated\",\n  \"token\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGVlY2ExYzRiZGM2MzBmMzdiNTMzYzMiLCJpYXQiOjE2MjYyNjQ2MzEsImV4cCI6MTYyNjMwNzgzMX0.1M_jnOVI5hKdht8TjBipeapC_0FseE4w_d5U9TEOqGE\",\n}",
          "type": "json"
        }
      ]
    },
    "filename": "C:/xampp/htdocs/nodeBoilerPlate/components/auth/authController.js",
    "groupTitle": "Auth",
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "optional": false,
            "field": "MissingParamsError",
            "description": "<p>Error Code <code>2</code> Missing parameters</p>"
          },
          {
            "group": "400",
            "optional": false,
            "field": "ShortPassword",
            "description": "<p>Error Code <code>14</code> Password must have 6 characters'</p>"
          }
        ],
        "404": [
          {
            "group": "404",
            "optional": false,
            "field": "NotFound",
            "description": "<p>Error Code <code>4</code> Not Found</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"message\": \"Missing parameters\",\n  \"status\": 400,\n  \"errorCode\": 2,\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"message\": \"Password must have 6 characters'\",\n  \"status\": 400,\n  \"errorCode\": 14,\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"message\": \"Not Found\",\n  \"status\": 404,\n  \"errorCode\": 4,\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "post",
    "url": "/forgot-password",
    "title": "Forgot password",
    "version": "1.0.0",
    "name": "forgotPassword",
    "description": "<p>Sends an email with the token to reset the password</p>",
    "group": "Auth",
    "parameter": {
      "fields": {
        "body": [
          {
            "group": "body",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"message\": \"Successfully generated reset token\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "C:/xampp/htdocs/nodeBoilerPlate/components/auth/authController.js",
    "groupTitle": "Auth",
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "optional": false,
            "field": "MissingParamsError",
            "description": "<p>Error Code <code>2</code> Missing parameters</p>"
          },
          {
            "group": "400",
            "optional": false,
            "field": "ValidEmailError",
            "description": "<p>Error Code <code>9</code> Please fill a valid email address</p>"
          },
          {
            "group": "400",
            "optional": false,
            "field": "MailFailed",
            "description": "<p>Error Code <code>24</code> Mail was not sent</p>"
          }
        ],
        "404": [
          {
            "group": "404",
            "optional": false,
            "field": "UserNotFound",
            "description": "<p>Error Code <code>28</code> User was not found</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"message\": \"Missing parameters\",\n  \"status\": 400,\n  \"errorCode\": 2,\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"message\": \"Please fill a valid email address\",\n  \"status\": 400,\n  \"errorCode\": 9,\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"message\": \"User was not found\",\n  \"status\": 404,\n  \"errorCode\": 28,\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"message\": \"Mail was not sent\",\n  \"status\": 400,\n  \"errorCode\": 24,\n }",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "post",
    "url": "/refresh-token",
    "title": "Refresh token",
    "version": "1.0.0",
    "name": "refreshToken",
    "description": "<h2>Allowed roles:</h2> <ul> <li>SuperAdmin</li> <li>User</li> </ul>",
    "group": "Auth",
    "parameter": {
      "fields": {
        "body": [
          {
            "group": "body",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>User expired token</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"message\": \"Successfully refreshed token\",\n  \"token\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1OWFlNzAwMGJmZDgyNzNhYjI3ZDVmYTki\",\n  \"results\": { ... }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "C:/xampp/htdocs/nodeBoilerPlate/components/auth/authController.js",
    "groupTitle": "Auth",
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "optional": false,
            "field": "MissingParamsError",
            "description": "<p>Error Code <code>2</code> Missing parameters</p>"
          },
          {
            "group": "400",
            "optional": false,
            "field": "InvalidValue",
            "description": "<p>Error Code <code>6</code> Value is not valid</p>"
          }
        ],
        "404": [
          {
            "group": "404",
            "optional": false,
            "field": "UserNotFound",
            "description": "<p>Error Code <code>28</code> User was not found</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"message\": \"Missing parameters\",\n  \"status\": 400,\n  \"errorCode\": 2,\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"message\": \"Value is not valid\",\n  \"status\": 400,\n  \"errorCode\": 6,\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"message\": \"User was not found\",\n  \"status\": 404,\n  \"errorCode\": 28,\n }",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "post",
    "url": "/reset-password/:resetToken",
    "title": "Reset password",
    "version": "1.0.0",
    "name": "resetPassword",
    "description": "<p>Resets the password if the token is valid</p>",
    "group": "Auth",
    "parameter": {
      "fields": {
        "body": [
          {
            "group": "body",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>New password</p>"
          }
        ],
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "resetToken",
            "description": "<p>ResetToken</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"message\": \"Password updated\",\n   \"token\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGVlY2ExYzRiZGM2MzBmMzdiNTMzYzMiLCJpYXQiOjE2MjYyNjQ2MzEsImV4cCI6MTYyNjMwNzgzMX0.1M_jnOVI5hKdht8TjBipeapC_0FseE4w_d5U9TEOqGE\",\n   \"results\": {\n       \"_id\": \"60eeca1c4bdc630f37b533c3\",\n       \"role\": \"User\",\n       \"isActive\": true,\n       \"isDeleted\": false,\n       \"allowNotifications\": true,\n       \"favorites\": [],\n       \"ratingsSum\": 0,\n       \"ratingsQuantity\": 0,\n       \"email\": \"test@gmail.com\",\n       \"name\": \"test\",\n       \"verificationCode\": \"eWClh8gZh1rK8A3f0SgqsNjWUlGQAKn\",\n       \"permissionToReviews\": [],\n       \"createdAt\": \"2021-07-14T11:27:24.159Z\",\n       \"updatedAt\": \"2021-07-14T12:10:17.906Z\"\n   }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "C:/xampp/htdocs/nodeBoilerPlate/components/auth/authController.js",
    "groupTitle": "Auth",
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "optional": false,
            "field": "MissingParamsError",
            "description": "<p>Error Code <code>2</code> Missing parameters</p>"
          },
          {
            "group": "400",
            "optional": false,
            "field": "ShortPassword",
            "description": "<p>Error Code <code>14</code> Password must have 6 characters'</p>"
          }
        ],
        "404": [
          {
            "group": "404",
            "optional": false,
            "field": "UserNotFound",
            "description": "<p>Error Code <code>28</code> User was not found</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"message\": \"Missing parameters\",\n  \"status\": 400,\n  \"errorCode\": 2,\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"message\": \"Password must have 6 characters'\",\n  \"status\": 400,\n  \"errorCode\": 14,\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"message\": \"User was not found\",\n  \"status\": 404,\n  \"errorCode\": 28,\n }",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "post",
    "url": "/confirm-email/resend",
    "title": "Ask new confirm email",
    "version": "1.0.0",
    "name": "Ask_new_confirm_email",
    "description": "<p>Resend already generated activation code</p>",
    "group": "User",
    "parameter": {
      "fields": {
        "body": [
          {
            "group": "body",
            "type": "string",
            "optional": false,
            "field": "email",
            "description": "<p>email</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n   \"message\": \"Succsses\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "C:/xampp/htdocs/nodeBoilerPlate/components/auth/authController.js",
    "groupTitle": "User",
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "optional": false,
            "field": "MissingParamsError",
            "description": "<p>Error Code <code>2</code> Missing parameters</p>"
          },
          {
            "group": "400",
            "optional": false,
            "field": "ValidEmailError",
            "description": "<p>Error Code <code>9</code> Please fill a valid email address</p>"
          },
          {
            "group": "400",
            "optional": false,
            "field": "BadRequest",
            "description": "<p>Error Code <code>7</code> Bad Request</p>"
          },
          {
            "group": "400",
            "optional": false,
            "field": "MailFailed",
            "description": "<p>Error Code <code>24</code> Mail was not sent</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"message\": \"Missing parameters\",\n  \"status\": 400,\n  \"errorCode\": 2,\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"message\": \"Please fill a valid email address\",\n  \"status\": 400,\n  \"errorCode\": 9,\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"message\": \"Bad Request\",\n  \"status\": 400,\n  \"errorCode\": 7,\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"message\": \"Mail was not sent\",\n  \"status\": 400,\n  \"errorCode\": 24,\n }",
          "type": "json"
        }
      ]
    }
  }
] });
