const Review=require("../models/review");
const Listing=require("../models/listing");

module.exports.createReview=async(req,res)=>{
    // console.log(req.params.id);
     let listing=await Listing.findById(req.params.id);
     let newReview=new Review(req.body.review);
     newReview.author=req.user._id;
     console.log(newReview);
 
     listing.review.push(newReview);
 
     await newReview.save();
     await listing.save();
     req.flash("success","new review added!");
     // console.log("new reivew saved");
     // res.send("new review saved");
     res.redirect(`/listings/${listing._id}`);
 }

module.exports.destroyReview=async(req,res)=>{
    let {id,reviewId}=req.params;
    await Listing.findByIdAndUpdate(id,{$pull: {review: reviewId}});
    await Review.findByIdAndDelete(reviewId);
    req.flash("success","review deleted !");

    res.redirect(`/listings/${id}`);
}