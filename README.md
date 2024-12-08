# ChartFlow API

ChartFlow API is a backend service designed to power interactive data visualization dashboards. It provides endpoints for user authentication, fetching user-specific analytics data, and managing trends and features.

## Author

- Debasish Halder

---

## Base URL
### https://chartflowapi-production.up.railway.app/

---

## Endpoints

### 1. Sign Up
Registers a new user.  
**URL**: `/api/users/signup/`  
**Method**: `POST`  
**Payload**:  
```json
{
  "name": "John Doe",
  "email": "johndoe@example.com",
  "password": "securepassword"
}
```

### 2. Sign In
Registers a new user.  
**URL**: `/api/users/signin/`  
**Method**: `POST`  
**Payload**:  
```json
{
  "email": "johndoe@example.com",
  "password": "securepassword"
}
```

### 3. User Info
Registers a new user.  
**URL**: `/api/dashboard/`  
**Method**: `POST`  
**Payload**:  
```json
{
  "name": "John Doe",
  "email": "johndoe@example.com",
}
```

### 3. Features Data
Fetches bar chart data for features.  
**URL**: `/api/dashboard/features`  
**Method**: `POST`  
**Payload**:  
```json
[
    {
        "totalA": 48878,
        "totalB": 51737,
        "totalC": 55200,
        "totalD": 53427,
        "totalE": 52245,
        "totalF": 55789
    }
]
```

### 3.1 Query Parameters for Features
Fetches bar chart data for features according to the query parameters.  
**URL**: `/api/dashboard/features?start_date=2022-10-04&end_date=2022-10-11&age=15-25&gender=male`  
**Method**: `POST`  
**Payload**:  
```json
[
    {
        "totalA": 2230,
        "totalB": 4215,
        "totalC": 5366,
        "totalD": 4178,
        "totalE": 4320,
        "totalF": 4641
    }
]
```

| **Parameter** | **Type**   | **Required** | **Description**                                 | **Example**        |
|---------------|------------|--------------|-------------------------------------------------|--------------------|
| `start_date`   | `date`   | No           | Start date for the range in `YYYY-MM-DD` format.| `2023-01-01`       |
| `end_date`     | `date`   | No           | End date for the range in `YYYY-MM-DD` format.  | `2023-01-31`       |
| `age`          | `number` | No           | Filter to show age specific information.        | `15-25` or `>25`   |
| `gender`       | `string` | No           | Filter to show gender specific information.     | `male`             |

### 4. Trend
Fetches line chart data for trends.  
**URL**: `/api/dashboard/trend`  
**Method**: `POST`  
**Payload**:  
```json
[
    {
        "A": 607,
        "Day": "2022-10-04T00:00:00.000Z"
    },
    {
        "A": 940,
        "Day": "2022-10-05T00:00:00.000Z"
    },
    {
        "A": 39,
        "Day": "2022-10-06T00:00:00.000Z"
    }
]
```

### 4.1 Query Parameters for Trend
Fetches line chart data for trend according to the query parameters by specific category of feature.  
**URL**: `/api/dashboard/features?start_date=2022-10-04&end_date=2022-10-11&age=15-25&gender=male&category=B`  
**Method**: `POST`  
**Payload**:  
```json
[
    {
        "B": 411,
        "Day": "2022-10-04T00:00:00.000Z"
    },
    {
        "B": 357,
        "Day": "2022-10-05T00:00:00.000Z"
    },
    {
        "B": 292,
        "Day": "2022-10-06T00:00:00.000Z"
    }
]
```

| **Parameter** | **Type**   | **Required** | **Description**                                 | **Example**        |
|---------------|------------|--------------|-------------------------------------------------|--------------------|
| `start_date`   | `date`   | No          | Start date for the range in `YYYY-MM-DD` format.| `2023-01-01`       |
| `end_date`     | `date`   | No          | End date for the range in `YYYY-MM-DD` format.  | `2023-01-31`       |
| `age`          | `number` | No          | Filter to show age specific information.        | `15-25` or `>25`   |
| `gender`       | `string` | No          | Filter to show gender specific information.     | `male`             |
| `category`     | `char`   | Yes         | Trend data for features in `A`, `B`, `C`, `D`, `E` and `F` | `A`             |

### 5. Logout
Logs out the user and invalidates the session.  
**URL**: `/api/dashboard/logout`  
**Method**: `POST`  
**Response**: `Logged out`  

## Installation

To install and run the API locally, follow these steps:

- Clone this repository: `git clone https://github.com/hdebasish/ChartFlowAPI.git`
- Navigate to the project directory: `cd ChartFlowAPI`
- Install dependencies: `npm install`
- Create a .env file and set up the required environment variables:

```text
PORT=5000
MONGO_URI=<Your_MongoDB_Connection_String>
JWT_SECRET=<Your_Secret_Key>
```

- Start the server: `npm start`

## Feedback

If you have any feedback, please reach out to us at hdebasish@gmail.com
