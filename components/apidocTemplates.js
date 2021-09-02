/**
 * @apiDefine MissingParamsError
 *
 * @apiError (400) MissingParamsError Error Code <code>2</code> Missing parameters
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "message": "Missing parameters",
 *       "status": 400,
 *       "errorCode": 2,
 *     }
 */

/**
 * @apiDefine NotAcceptable
 *
 * @apiError (406) NotAcceptable Error Code <code>3</code> Not acceptable
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 406 Not Acceptable
 *     {
 *       "message": "Not acceptable",
 *       "status": 406,
 *       "errorCode": 3,
 *     }
 */

/**
 * @apiDefine NotFound
 *
 * @apiError (404) NotFound Error Code <code>4</code> Not Found
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "message": "Not Found",
 *       "status": 404,
 *       "errorCode": 4,
 *     }
 */

/**
 * @apiDefine Forbidden
 *
 * @apiError (403) Forbidden Error Code <code>5</code> Insufficient privileges
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 403 Forbidden
 *     {
 *       "message": "Insufficient privileges",
 *       "status": 403,
 *       "errorCode": 5,
 *     }
 */

/**
 * @apiDefine InvalidValue
 *
 * @apiError (400) InvalidValue Error Code <code>6</code> Value is not valid
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "message": "Value is not valid",
 *       "status": 400,
 *       "errorCode": 6,
 *     }
 */

/**
 * @apiDefine BadRequest
 *
 * @apiError (400) BadRequest Error Code <code>7</code> Bad Request
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "message": "Bad Request",
 *       "status": 400,
 *       "errorCode": 7,
 *     }
 */

/**
 * @apiDefine CredentialsError
 *
 * @apiError (401) CredentialsError Error Code <code>8</code> Wrong credentials
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 401 Unauthorized
 *     {
 *       "message": "Wrong credentials",
 *       "status": 401,
 *       "errorCode": 8,
 *     }
 */

/**
 * @apiDefine ValidEmailError
 *
 * @apiError (400) ValidEmailError Error Code <code>9</code> Please fill a valid email address
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "message": "Please fill a valid email address",
 *       "status": 400,
 *       "errorCode": 9,
 *     }
 */

/**
 * @apiDefine DuplicateEmailError
 *
 * @apiError (406) DuplicateEmailError Error Code <code>10</code> This email address is already registered
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 406 Not Acceptable
 *     {
 *       "message": "This email address is already registered",
 *       "status": 406,
 *       "errorCode": 10,
 *     }
 */

/**
 * @apiDefine FileUploadError
 *
 * @apiError (400) FileUploadError Error Code <code>11</code> Something went wrong during file upload
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "message": "Something went wrong during file upload",
 *       "status": 400,
 *       "errorCode": 11,
 *     }
 */

/**
 * @apiDefine UnauthorizedError
 *
 * @apiError (401) UnauthorizedError Error Code <code>12</code> Invalid credentials
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 401 Unauthorized
 *     {
 *       "message": "Invalid credentials",
 *       "status": 401,
 *       "errorCode": 12,
 *     }
 */

/**
 * @apiDefine AuthorizationTokenError
 *
 * @apiError (401) AuthorizationTokenError Error Code <code>1</code> No authorization token was found
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 401 Unauthorized
 *     {
 *       "message": "No authorization token was found",
 *       "status": 401,
 *       "errorCode": 1,
 *     }
 */

/**
 * @apiDefine JwtMalformed
 *
 * @apiError (401) JwtMalformed Error Code <code>16</code> Jwt is malformed
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 401 Unauthorized
 *     {
 *       "message": "Jwt malformed",
 *       "status": 401,
 *       "errorCode": 16,
 *     }
 */

/**
 * @apiDefine PasswordsUnmatching
 *
 * @apiError (400) PasswordsUnmatching Error Code <code>13</code> Password and confirmed password are not matching
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "message": "Password and confirmed password are not matching",
 *       "status": 400,
 *       "errorCode": 13,
 *     }
 */

/**
 * @apiDefine ShortPassword
 *
 * @apiError (400) ShortPassword Error Code <code>14</code> Password must have 6 characters'
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "message": "Password must have 6 characters'",
 *       "status": 400,
 *       "errorCode": 14,
 *     }
 */

/**
 * @apiDefine OwnJobFavorite
 *
 * @apiError (400) OwnJobFavorite Error Code <code>15</code> You cant add own job/service as favourite
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "message": "You cant add own job/service as favourite",
 *       "status": 400,
 *       "errorCode": 15,
 *     }
 */

/**
 * @apiDefine NoReportReason
 *
 * @apiError (400) NoReportReason Error Code <code>17</code> Report reason isnt in db
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "message": "Report reason isnt in db",
 *       "status": 400,
 *       "errorCode": 17,
 *     }
 */

/**
 * @apiDefine NotValidMongoId
 *
 * @apiError (400) NotValidMongoId Error Code <code>18</code> Not valid id
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "message": "Not valid id",
 *       "status": 400,
 *       "errorCode": 18,
 *     }
 */

/**
 * @apiDefine ParametarMustString
 *
 * @apiError (400) ParametarMustString Error Code <code>19</code> Parametar must be string
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "message": "Parametar must be string",
 *       "status": 400,
 *       "errorCode": 19,
 *     }
 */

/**
 * @apiDefine NoPermToReview
 *
 * @apiError (403) NoPermToReview Error Code <code>20</code> You do not have permission to review
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 403 Bad Request
 *     {
 *       "message": "You do not have permission to review",
 *       "status": 403,
 *       "errorCode": 20,
 *    }
 */

/**
 * @apiDefine NoLocation
 *
 * @apiError (400) NoLocation Error Code <code>21</code> Location isnt in db
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "message": "Location isnt in db",
 *       "status": 400,
 *       "errorCode": 21,
 *     }
 */

/**
 * @apiDefine DuplicateEntry
 *
 * @apiError (400) DuplicateEntry Error Code <code>22</code> Duplicate Entry
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "message": "Duplicate Entry",
 *       "status": 400,
 *       "errorCode": 22,
 *     }
 */

/**
 * * @apiDefine ReportAllreadyExist
 *
 * @apiError (403) ReportAllreadyExist Error Code <code>23</code> Allready reported
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 403 Forbbiden
 *     {
 *       "message": "Allready Reported",
 *       "status": 403,
 *       "errorCode": 23,
 *      }
 */

/**
 * * @apiDefine MailFailed
 *
 * @apiError (400) MailFailed Error Code <code>24</code> Mail was not sent
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "message": "Mail was not sent",
 *       "status": 400,
 *       "errorCode": 24,
 *      }
 */

/**
 * * @apiDefine InvalidSignature
 *
 * @apiError (401) InvalidSignature Error Code <code>25</code> Invalid token value
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 401 Unauthorized
 *     {
 *       "message": "Invalid token value",
 *       "status": 401,
 *       "errorCode": 25,
 *      }
 */

/**
 * * @apiDefine JwtExpired
 *
 * @apiError (401) JwtExpired Error Code <code>26</code> Token expired
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 401 Unauthorized
 *     {
 *       "message": "Token expired",
 *       "status": 401,
 *       "errorCode": 26,
 *      }
 */

/**
 * * @apiDefine JobNotFound
 *
 * @apiError (404) JobNotFound Error Code <code>27</code> Job was not found
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "message": "Job was not found",
 *       "status": 404,
 *       "errorCode": 27,
 *      }
 */

/**
 * * @apiDefine UserNotFound
 *
 * @apiError (404) UserNotFound Error Code <code>28</code> User was not found
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "message": "User was not found",
 *       "status": 404,
 *       "errorCode": 28,
 *      }
 */

/**
 * * @apiDefine UserDeleted
 *
 * @apiError (404) UserDeleted Error Code <code>29</code> User was deleted
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "message": "User was deleted",
 *       "status": 404,
 *       "errorCode": 29,
 *      }
 */

/**
 * * @apiDefine UserUnactive
 *
 * @apiError (403) UserUnactive Error Code <code>30</code> User is not active
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 403 Forbbiden
 *     {
 *       "message": "User is not active",
 *       "status": 403,
 *       "errorCode": 30,
 *      }
 */

/**
 * * @apiDefine CategoryNotFound
 *
 * @apiError (404) CategoryNotFound Error Code <code>31</code> Category was not found
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "message": "Category was not found",
 *       "status": 404,
 *       "errorCode": 31,
 *      }
 */

/**
 * * @apiDefine ConversationNotFound
 *
 * @apiError (404) ConversationNotFound Error Code <code>32</code> Conversation was not found
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "message": "Conversation was not found",
 *       "status": 404,
 *       "errorCode": 32,
 *      }
 */

/**
 * * @apiDefine MessageNotFound
 *
 * @apiError (404) MessageNotFound Error Code <code>33</code> Message was not found
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "message": "Message was not found",
 *       "status": 404,
 *       "errorCode": 33,
 *      }
 */

/**
 * * @apiDefine ReviewNotFound
 *
 * @apiError (404) ReviewNotFound Error Code <code>34</code> Review was not found
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "message": "Review was not found",
 *       "status": 404,
 *       "errorCode": 34,
 *      }
 */
