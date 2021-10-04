# RESTful API

## API Routes

HTTP Method | Resource URL | Notes
---|---|---
**GET**  | /api/accmeter  | return a accmeter object.
**POST** | /api/accmeter  | register an accmeter(x,y,z) object.


## Accmeter JSON example
---
      'title':'accelerometer values',
      'body':{'x':123434, 'y':0.022, 'z':9.80}
---