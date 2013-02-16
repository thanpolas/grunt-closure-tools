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
