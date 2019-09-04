import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  session: service(),
  store: service(),

  model({ slug }) {
    return this.store.findRecord('article', slug);
  },
});
