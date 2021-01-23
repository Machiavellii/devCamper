const Bootcamp = require("../models/Bootcamp");

const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");

const geocoder = require("../utils/geocoder");
const path = require("path");

//@desc  Get All Bootcamps
//@route GET /api/v1/bootcamps
//@access Public
exports.getBootcamps = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

//@desc  Get Single Bootcamp
//@route GET /api/v1/bootcamps
//@access Public
exports.getBootcamp = asyncHandler(async (req, res, next) => {
  // const bootcamp = await Bootcamp.findOne({ slug: req.params.slug });
  const bootcamp = await Bootcamp.findById(req.params.id);

  // const { data } = res.advancedResults;
  // const bootCouse = data.filter((boot) => {
  //   const regex = new RegExp(req.params.slug, "gi");
  //   return boot.slug.match(regex);
  // });

  if (!bootcamp) {
    return next(
      new ErrorResponse(
        `Bootcamp not found with that name ${req.params.id} in database`,
        404
      )
    );
  }

  res.status(200).json({ success: true, data: bootcamp });
});

//@desc  Get Single Bootcamp
//@route GET /api/v1/bootcamps/me
//@access Private
exports.getBootcampMe = asyncHandler(async (req, res, next) => {
  //Add user to req.body
  req.body.user = req.user.id;

  // Check for published bootcamp
  const bootcamp = await Bootcamp.findOne({ user: req.user.id });

  if (!bootcamp) {
    return next(
      new ErrorResponse(
        `Bootcamp not found this id ${req.params.id} in database`,
        404
      )
    );
  }

  res.status(200).json({ success: true, data: bootcamp });
});

//@desc  Create new Bootcamp
//@route POST /api/v1/bootcamps
//@access Private
exports.createBootcamp = asyncHandler(async (req, res, next) => {
  //Add user to req.body
  req.body.user = req.user.id;

  // Check for published bootcamp
  const publishedBootcamp = await Bootcamp.findOne({ user: req.user.id });

  // If the user is not an admin, they can only add one bootcamp
  if (publishedBootcamp && req.user.role !== "admin") {
    return next(
      new ErrorResponse(
        `The user with id ${req.user.id} has already published a bootcamp`,
        400
      )
    );
  }

  const bootcamp = await Bootcamp.create(req.body);

  res.status(201).json({ success: true, data: bootcamp });
});

//@desc  Update Bootcamp
//@route PUT /api/v1/bootcamps/:id
//@access Private
exports.updateBootcamps = asyncHandler(async (req, res, next) => {
  let bootcamp = await Bootcamp.findById(req.params.id);

  if (!bootcamp) {
    return next(
      new ErrorResponse(
        `Bootcamp not found this id ${req.params.id} in database`,
        404
      )
    );
  }

  // Make sure user is bootcamp owner
  if (bootcamp.user.toString() !== req.user.id && req.user.role !== "admin") {
    return next(
      new ErrorResponse(
        `User ${req.params.id} is not authorized to update this bootcamp`,
        401
      )
    );
  }

  const locat = await geocoder.geocode(req.body.address);

  req.body.location = {
    type: "Point",
    coordinates: [locat[0].longitude, locat[0].latitude],
    formattedAddress: locat[0].formattedAddress,
    city: locat[0].city,
    zipcode: locat[0].zipcode,
    canton: locat[0].state,
    country: locat[0].country,
    streetName: locat[0].streetName,
    streetNumber: locat[0].streetNumber,
    countryCode: locat[0].countryCode,
  };

  bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({ success: true, data: bootcamp });
});

//@desc  Delete Bootcamp
//@route DELETE /api/v1/bootcamps/:id
//@access Private
exports.deleteBootcamps = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findById(req.params.id);

  if (!bootcamp) {
    return next(
      new ErrorResponse(
        `Bootcamp not found this id ${req.params.id} in database`,
        404
      )
    );
  }

  // Make sure user is bootcamp owner
  if (bootcamp.user.toString() !== req.user.id && req.user.role !== "admin") {
    return next(
      new ErrorResponse(
        `User ${req.params.id} is not authorized to delete this bootcamp`,
        401
      )
    );
  }

  bootcamp.remove();

  res.status(200).json({ success: true, data: {} });
});

//@desc  Get Bootcamps  within a radius
//@route GET /api/v1/bootcamps/radius/:zipcode/:distance
//@access Private
exports.getBootcampsInRadius = asyncHandler(async (req, res, next) => {
  const { zipcode, distance } = req.params;

  // Get lat & lng from Geocoder
  const loc = await geocoder.geocode(zipcode);
  const lat = loc[0].latitude;
  const lng = loc[0].longitude;

  // Calc radius using radians
  // Divide distance by radius of Earth Earth radius = 3,963 miles / 6,378 km
  const radius = distance / 6378;

  const bootcamps = await Bootcamp.find({
    location: { $geoWithin: { $centerSphere: [[lng, lat], radius] } },
  });

  res
    .status(200)
    .json({ success: true, count: bootcamps.length, data: bootcamps });
});

//@desc  Upload photo for Bootcamp
//@route PUT /api/v1/bootcamps/:id/photo
//@access Private
exports.bootcampPhotoUpload = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findById(req.params.id);

  if (!bootcamp) {
    return next(
      new ErrorResponse(
        `Bootcamp not found this id ${req.params.id} in database`,
        404
      )
    );
  }

  // Make sure user is bootcamp owner
  if (bootcamp.user.toString() !== req.user.id && req.user.role !== "admin") {
    return next(
      new ErrorResponse(
        `User ${req.params.id} is not authorized to update this bootcamp`,
        401
      )
    );
  }

  if (!req.files) {
    return next(new ErrorResponse(`Please upload a file`, 404));
  }

  const file = req.files.photo;
  // Make sure the image is a photo

  if (!file.mimetype.startsWith("image")) {
    return next(new ErrorResponse(`Please upload an image file`, 400));
  }

  // Check file size
  if (file.size > process.env.MAX_FILE_UPLOAD) {
    return next(
      new ErrorResponse(
        `Please upload an image less than ${process.env.MAX_FILE_UPLOAD}`,
        400
      )
    );
  }

  // Create custom filename
  file.name = `photo_${bootcamp._id}${path.parse(file.name).ext}`;
  // ${process.env.FILE_UPLOAD_PATH}
  file.mv(`./backend/public/uploads/${file.name}`, async (err) => {
    if (err) {
      console.error(err);
      return next(new ErrorResponse(`Problem with file upload`, 500));
    }

    await Bootcamp.findByIdAndUpdate(
      req.params.id,
      { photo: file.name },
      { useFindAndModify: false }
    );

    res.status(200).json({ success: true, data: file.name });
  });
});
