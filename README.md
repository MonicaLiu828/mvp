# What's eat

<!--
> This material was originally posted [here](http://www.quora.com/What-is-Amazons-approach-to-product-development-and-product-management). It is reproduced here for posterities sake.

There is an approach called "working backwards" that is widely used at Amazon. They work backwards from the customer, rather than starting with an idea for a product and trying to bolt customers onto it. While working backwards can be applied to any specific product decision, using this approach is especially important when developing new products or features.

For new initiatives a product manager typically starts by writing an internal press release announcing the finished product. The target audience for the press release is the new/updated product's customers, which can be retail customers or internal users of a tool or technology. Internal press releases are centered around the customer problem, how current solutions (internal or external) fail, and how the new product will blow away existing solutions.

If the benefits listed don't sound very interesting or exciting to customers, then perhaps they're not (and shouldn't be built). Instead, the product manager should keep iterating on the press release until they've come up with benefits that actually sound like benefits. Iterating on a press release is a lot less expensive than iterating on the product itself (and quicker!).

If the press release is more than a page and a half, it is probably too long. Keep it simple. 3-4 sentences for most paragraphs. Cut out the fat. Don't make it into a spec. You can accompany the press release with a FAQ that answers all of the other business or execution questions so the press release can stay focused on what the customer gets. My rule of thumb is that if the press release is hard to write, then the product is probably going to suck. Keep working at it until the outline for each paragraph flows.

Oh, and I also like to write press-releases in what I call "Oprah-speak" for mainstream consumer products. Imagine you're sitting on Oprah's couch and have just explained the product to her, and then you listen as she explains it to her audience. That's "Oprah-speak", not "Geek-speak".

Once the project moves into development, the press release can be used as a touchstone; a guiding light. The product team can ask themselves, "Are we building what is in the press release?" If they find they're spending time building things that aren't in the press release (overbuilding), they need to ask themselves why. This keeps product development focused on achieving the customer benefits and not building extraneous stuff that takes longer to build, takes resources to maintain, and doesn't provide real customer benefit (at least not enough to warrant inclusion in the press release).
 -->


<div align="center" width="100%">
  <img src="https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB" />
  <img src="https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white" />
  <img src="https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB" />
  <img src="https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white" />
</div>

## Heading ##
  > It's an app to give at most 4 random restaurants per time for user togit chose.

## Sub-Heading ##
  > Sometimes it's difficult to decide which reastaurants you want to go to, use this app you can get some random restaurants filter by your picked-up criteria.

## Overview
### homepage link

## Tech Stack
**Built with**
- [ReactJS](https://reactjs.org/)
- [MUI](https://mui.com/)
- [Webpack](https://webpack.js.org/)
- [NodeJS](https://nodejs.org/en/)
- [ExpressJS](https://expressjs.com/)
- [Axios](https://axios-http.com/)
- [MongoDB](https://www.mongodb.com/)


## Summary ##
  - Datasource: all restaurant data is from yelp api.
  - Navigation: you can choose location, find nearby restaurants by your preferred price, category and radius. When you click the 'what's eat' button.
  - Functionality:
    - this app will pop up relevant restaurants in the Random Restaurants part. It will gives you at most 4 restaurants at one time. Also, if there is no releted restaurants within your criteria, this app will search and return random results by your location instead.
    - when you chosed one popped-up restaurant you' like to go, click 'click to visit' button, then this restaurant will go into Restaurants visited part and this 'click to visit' button will become to 'visited'.
  - Visited Records: all restaurants you'd been visited will be listed in Restaurants visited part. You can check whether one restaurant you'd like to visit has been visited before.


## How to Get Started ##
  - git clone and run  `npm install`
  - start server by run `npm run server-dev`
  - then start React by running `npm run react-dev`
  - go to `localhost:3000` you can find this app and then enjoy your meal with random restaurants!

