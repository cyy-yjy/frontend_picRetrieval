# Lab 3: Information Retrieval
### 1. Requirements of an image search task
#### 1.1. Upload an image  
Users can upload an image for searching through the input box and specify image format and size limits to avoid errors. A preview of the images to be queried is available in the search window. It is also possible to control the size of the initial result set, use the image source carefully and finalise the output of results and hints. 
#### 1.2. Set search parameter and launch search  
The user initiates a search using a clear button label (e.g. "Search") to upload images and can automatically update the search results with parameter changes. Auto-complete guides the user to a successful query.  
#### 1.3. Review of results with an overview and options 
The search results are visualised, the search conditions and restrictions are always visible, providing an overview of the final searched images, e.g. the total number. For image search results, it is possible to categorise and describe the image results with tags, to highlight the search conditions in the results, to adjust the search result size, sorting, display and other properties. And you can view selected images.  
#### 1.4. Refine results 
The user is guided to refine the search results step by step by means of suggestive messages, and it is convenient for the user to change the search parameters and re-search at any time. If a search error occurs, error messages and suggestions for correcting the error are provided, but error correction is not mandatory. Search results can be filtered by tags and whether the search is in favourites or not.
#### 1.5. Use and interact with results
Various actions can be performed on the search image results, such as bookmarking favourite images, downloading them locally, viewing favourites, and sending them to other apps via email, sharing, etc. It is also possible to comment, rate, write annotations, etc. on the images.  
### 2. Our design and implementation of Five-Stages
#### 2.1. Formulation  

Click on the "+" box in the middle to select the image to be uploaded, the image should be in the dataset folder.

![初始界面](.\images\1.jpg)



After selecting the image, the image will appear in the box position. If you click on the image again, you can re-select the image.

![Preview and Reselect the Image](.\images\2.png)



The heart button at the bottom will add the selected image to your favourites.   

![](.\images\3.png)



#### 2.2. Initiation of action  

You can change the number of searched results below the image.

![](.\images\4.jpg)



Click the search button to start searching.  

![](.\images\5.png)





#### 2.3. Review of results

Overview of search results, which shows how many images have been searched for in total and shows the name of each image and the tags attached to the image in the search results. Also shows tags for all search results. 

![](.\images\6.png)





Click the heart button to the right of the image to add it to your favorates.
![](.\images\8.jpg)

Standalone images can be viewed in preview.

<img src=".\images\7.jpg" style="zoom:80%;" />

#### 2.4. Refinement
  ！[只看喜欢]() 

Click on Only Like to view only the parts of the search results that have been added to your favourites.

![image-20240521195409473](.\images\9.png)

![](D:\vs_temp\images\10.png)



Click on the tabs above to filter by tab. When a tag turns yellow, images containing that tag are shown, and when the tag turns grey after clicking, images not containing that tag are hidden.

![](D:\vs_temp\images\11.jpg)



#### 2.5. Use

Click on the heart button to add the image to your favourites. Click on the "My Favourites" button to view all favourited images for management.

![](.\images\12.png)
