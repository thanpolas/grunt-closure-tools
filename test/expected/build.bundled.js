var goog = goog || {}; // Identifies this file as the Closure base.
goog.provide('Todos.ctrls.Todos');

/**
 * Todos controller
 *
 * @returns Class
 */
Todos.ctrls.Todos = Ember.Controller.extend({});
goog.provide('Todos.views.Items');

/**
 * View to render todos items
 *
 * @param String items_html, the html view for the `Todos` items
 * @returns Class
 */
Todos.views.Items = Ember.CollectionView.extend({});
goog.provide('Todos.Router');

goog.require('Todos.ctrls.Todos');
goog.require('Todos.views.Items');

/**
* Todos Router
*
* Defined routes represent filters according to specs
*
* @returns Class
*/
Todos.Router = Ember.Router.extend({});
goog.provide('Todos.views.ClearButton');

/**
 * View to clear completed tasks
 *
 * @param String button_html, the html for view
 * @returns Class
 */
Todos.views.ClearButton = Ember.View.extend({});
goog.provide('Todos.views.Stats');

/**
 * View to render todos stats
 *
 * @param String stats_html, stats indicator view
 * @returns Class
 */
Todos.views.Stats = Ember.View.extend({});
goog.provide('Todos.views.Filters');

/**
 * View to render filter links
 *
 * @param String filters_html, filter links html view
 * @returns Class
 */
Todos.views.Filters = Ember.View.extend({});
goog.provide('Todos.views.Application');

goog.require('Todos.views.Stats');
goog.require('Todos.views.Filters');
goog.require('Todos.views.ClearButton');

/**
 * Main application view
 *
 * Requires
 * Class StatsView, stats view class
 * Class FiltersView, filters view class
 * Class ClearBtnView, clear button view class
 * @returns Class
 */
Todos.views.Application = Ember.ContainerView.extend({});
goog.provide('Todos.models.Todo');

/**
 * Todo entry model
 *
 * @returns Class
 */
Todos.models.Todo = Ember.Object.extend({});
goog.provide('Todos.models.Store');

goog.require('Todos.models.Todo');

// Our Store is represented by a single JS object in *localStorage*.
// Create it with a meaningful name, like the name you'd give a table.
Todos.models.Store = function( name ) {};
goog.provide('Todos.ctrls.Entries');

/**
 * Entries controller
 *
 * @returns Class
   */
Todos.ctrls.Entries = Ember.ArrayProxy.extend({});
// Load our app
goog.provide('Todos.app');

goog.require('Todos.Router');
goog.require('Todos.models.Store');
goog.require('Todos.ctrls.Entries');
goog.require('Todos.views.Application');

Todos.App = Ember.Application.create({});

