(function(){

  'use strict';

  app.constant('TRACKS', {
    channels: {
      createdCache: 'cached channels',
      expiredCache: 'expired channels cache',
      requesting: {
        fromServer: 'requesting channels from server',
        fromCache: 'requesting channels from cache'
      }
    },
    shows: {
      loaded: 'loaded shows list',
      failed: 'failed on getting interesting shows',
      blankslates: {
        noResults: 'shown blankslate for no interesting shows found',
        noInterests: 'shown blankslate no interests found'
      },
      createdCache: 'cached shows',
      expiredCache: 'expired shows cache',
      requesting: {
        fromServer: 'requesting shows from server',
        fromCache: 'requesting shows from cache'
      }
    },
    interests: {
      loadedList: 'loaded interests list',
      updatedList: 'updated interests list',
      submitted: 'submitted interest',
      added: 'added interest',
      clickedToRemove: 'clicked to remove interest',
      declinedToRemove: 'declined to remove interests',
      removed: 'removed interest',
      removedAll: 'removed all interests',
      clickedAddButton: 'clicked add interest button',
      backButton: 'clicked interests view back button'
    },
  });

}());
