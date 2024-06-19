# Stores
* View all Stores
  * `GET /api/stores`
* View the store owned by the Current User
  * `GET /api/stores/current`
* Create a Store
  * `POST /api/stores`
* Update a Store
  * `PUT /api/store/:storeId`
* Delete a Store
  * `DELETE /api/store/:storeId`

# Items 
* View all Items
  * `GET /api/items`
* View all Items of a specific Store
  * `GET /api/stores/:storeId/items`
* Create an Item for a Store
  * `POST /api/stores/:storeId/items`
* Update an Item
  * `PUT /api/items/:itemId`
* Delete an Item
  * `DELETE /api/items/:itemId`

# Follows
* User can view who follow them
  * `GET /api/follow/current-followers`
* User can view who they follow
  * `GET /api/follow/current-followees`
* User can follow another user
  * `POST /api/follow/:receiverId`
* User can unfollow another user
  * `DELETE /api/follow/:receiverId`

# Likes
* View all Likes of a Store
  * `GET /api/stores/:storeId/likes`
* User can like a Store
  * `POST /api/stores/:storeId/likes` 
* User can unlike a Store
  * `DELETE /api/likes/:likeId`

