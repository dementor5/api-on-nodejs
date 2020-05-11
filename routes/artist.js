const ArtistRouter = (newRouter, controller) => {
  newRouter.get('/', controller.all);
  newRouter.get('/:id', controller.findById);
  newRouter.post('/', controller.create);
  newRouter.put('/:id', controller.update);
  newRouter.delete('/:id', controller.delete);
  return newRouter;
};

module.exports = ArtistRouter;
