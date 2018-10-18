![header](https://github.com/OSWeekends/agile-project-template/raw/master/other/img/OSW-project-GitHub-template-header.jpg)

# Eventpoints Swagger Online

- https://eventpoints.baulen.com

## Eventpoints Endpoints 😆

- https://eventpoints.baulen.com/api/v1/events
- https://eventpoints.baulen.com/api/v1/events/{SomeID}

## How to generate the `api_spec.json` file

```
cd public
swagger-codegen generate -i api_spec.yaml -l swagger -o swagger-folder
cp swagger-folder/swagger.json ./api_spec.json
rm -rf swagger-folder
```

You need to have installed [Swagger Codegen](https://github.com/swagger-api/swagger-codegen)

## Other Links

- Frontend repo : https://github.com/OSWeekends/EventPoints
- Backend repo : https://github.com/OSWeekends/eventpoints-backend
- This repo branch : https://github.com/OSWeekends/eventpoints-backend/tree/swagger

## Where is it deployed ?

This branch is deployed into [**Netlify**](http://netlify.com). It uses a static cdn to server the swagger page. It also use the **Lambda Functions** to mockup the API.

The swagger page was built using [Swagger UI](https://github.com/swagger-api/swagger-ui)

![footer](https://github.com/OSWeekends/agile-project-template/raw/master/other/img/OSW-project-GitHub-template-footer.jpg)
