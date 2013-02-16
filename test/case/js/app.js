// Load our app
goog.provide('Todos.app');

goog.require('Todos.Router');
goog.require('Todos.models.Store');
goog.require('Todos.ctrls.Entries');
goog.require('Todos.views.Application');

Todos.App = Ember.Application.create({});

