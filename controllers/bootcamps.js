const Bootcamp = require("../models/Bootcamp");
const ErrorResponse = require("../utils/ErrorResponse");
const asyncHandler = require("../middleware/async");
//@desc Get all bootcamps
//@route GET api/v1/bootcamps
//@acces public
exports.getBootcamps = asyncHandler(async (req, res, next) => {
  const bootcamps = await Bootcamp.find();

  res.status(200).json({
    count: bootcamps.length,
    success: true,
    data: bootcamps,
  });
});

//@desc Get single bootcamp
//@route GET api/v1/bootcamps/:id
//@acces public
exports.getBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findById(req.params.id);
  if (!bootcamp) {
    return next(
      new ErrorResponse(`bootcamp not found on id ${req.params.id}`, 404)
    );
  }
  res.status(200).json({ success: true, data: bootcamp });
});

//@desc Create new bootcamp
//@route POST api/v1/bootcamps
//@acces private
exports.createBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.create(req.body);
  res.status(201).json({
    success: true,
    data: bootcamp,
  });
});

//@desc Update  bootcamp
//@route PUT api/v1/bootcamps/:id
//@acces private
exports.updateBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(201).json({ success: true, data: bootcamp });

  if (!bootcamp) {
    return next(
      new ErrorResponse(`bootcamp not found on id ${req.params.id}`, 404)
    );
  }
});

//@desc Delete  bootcamp
//@route Delte api/v1/bootcamps/:id
//@acces private
exports.deleteBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);
  res.status(200).json({ success: true, data: {} });
  if (!bootcamp) {
    return next(
      new ErrorResponse(`bootcamp not found on id ${req.params.id}`, 404)
    );
  }
});
