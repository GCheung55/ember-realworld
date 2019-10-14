import { module } from 'qunit';
import { setupTest } from 'ember-qunit';
import EmberObject from '@ember/object';
import test from 'ember-sinon-qunit/test-support/test';

module('Unit | Controller | home', function(hooks) {
  setupTest(hooks);

  test('`favoriteArticle` method favorites/unfavorites an article', async function(assert) {
    assert.expect(4);

    const controller = this.owner.lookup('controller:home');
    const articleFavorited = EmberObject.create({
      favorited: true,
      favorite: this.stub().resolves(),
      unfavorite: this.stub().resolves(),
    });
    const articleUnfavorited = EmberObject.create({
      favorited: false,
      favorite: this.stub().resolves(),
      unfavorite: this.stub().resolves(),
    });

    await controller.actions.favoriteArticle.call(controller, articleFavorited);
    assert.notOk(articleFavorited.favorite.called, 'Do not favorite a favorited article');
    assert.ok(articleFavorited.unfavorite.calledOnce, 'Unfavorite a favorited article');

    await controller.actions.favoriteArticle.call(controller, articleUnfavorited);
    assert.ok(articleUnfavorited.favorite.called, 'Favorite an unfavorited article');
    assert.notOk(articleUnfavorited.unfavorite.calledOnce, 'Do not unfavorite an unfavorited article');
  });
});
