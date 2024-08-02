# Algolia-showcase
Algolia is a search-as-a-service API that focuses on providing the best experience for the end users. That means being fast and relevant, by returning the best results in a few milliseconds, even with limited input


##  Storing data
1. Create an account on (https://www.algolia.com/)
2. Create an application: get started> top left - create an application
(3. rename in bottom left -settings>application>rename
4. go to the application again
5. create index(basically where data is stored )> index name capital( check the naming convention as shown)
6. upload data in the index in the form of JSON either enter manual JSON or you can upload a JSON file  [ you can use (www.mockaroo.com) json generator for product data or anything ]
7. Now your data is uploaded so you can manipulate it to do that 
8. First go to configuration>facets 
What are facets?
Basically, widgets that we create include lists, menus, refinement lists with checkboxes, range-sliders, menus, etc.
You can check how these facets look like here in [Algolia Showcase](https://www.algolia.com/doc/guides/building-search-ui/widgets/showcase/js/)


##  CREATING FACETS IN ALGOLIA
1.  Go to configuration tab now that you are inside index of project
2.  Go to facets tab (towards bottom of the list on left side) 
3.  Add attributes( in right hand side) 
attributes are fields of your json 
4. Set all the attributes to searchable 
5. Customize other settings as required
6. Save changes

