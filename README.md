# Algolia-showcase
Algolia is a search-as-a-service API that focuses on providing the best experience for the end users. That means being fast and relevant, by returning the best results in a few milliseconds, even with limited input


##  Storing data
1. Create an account on (https://www.algolia.com/)
2. Create an application: get started> top left - create an application
(3. rename in bottom left -settings>application>rename
4. go to the application again
5. {To see indexes go to left hand panel and select search option} create index(basically where data is stored )> index name capital( check the naming convention as shown)
6. upload data in the index in the form of JSON either enter manual JSON or you can upload a JSON file  [ you can use (www.mockaroo.com) json generator for product data or anything ]
7. Now your data is uploaded so you can manipulate it to do that 
8. First go to configuration>facets
   


##  CREATING FACETS IN ALGOLIA
- What are facets?
Basically, widgets that we create include lists, menus, refinement lists with checkboxes, range-sliders, menus, etc.
You can check how these facets look like here in [Algolia Showcase](https://www.algolia.com/doc/guides/building-search-ui/widgets/showcase/js/)
This helps us to see data in various formats

1.  Go to configuration tab now that you are inside index of project
2.  Go to facets tab (towards bottom of the list on left side) 
3.  Add attributes( in right hand side) 
- attributes are fields of your json 
4. Set all the attributes to searchable 
5. Customize other settings as required
6. Save changes

## Display Data
1. Go to ui demos tab (besides configuration tab at extreme right)
2. Press Generate new demo
3. Select Instantsearch option
4. Now a page would be created where you can see your data and the facets created
5. You can see this page under a tab inside uidemos tab in form of
6. This tab has three options at right : Delete, edit, view
7. delete: deletes the page , view: you can view the page without manipulating it
8. edit: here yo can add edit facets and get an idea of how it would appear on actual page

## To add facets in page
1. Select add filter
2. Select the type of filter or form you want y our facet to be in 
3. Give title to be displayed
4. add the attribute (that you made during creation of facets)
5. Adjust rest of the parameters as per requirements
6. You can se preview on Right hand side
7. After saving it you can see it on actual page
   

   

   

