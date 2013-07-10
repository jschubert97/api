define([
  "app",
  "backbone"
],

function(app, Backbone) {

  var TableSimple = Backbone.Layout.extend({

    events: {
      'click td' : function(e) {
        var id = $(e.target).closest('tr').attr('data-id');
        var route = Backbone.history.fragment.split('/');
        route.push(id);
        app.router.go(route);
      }
    },

    serialize: function() {
      var rows = this.collection.getRows();

      // Check permissions
      // @todo: filter this on the backend and get rid of this
      rows = _.filter(rows, function(row) {
        var privileges = app.privileges[row.table_name];

        // filter out tables without privileges
        if (privileges === undefined) return false;

        var permissions = privileges.get('permissions').split(',');

        // only return tables with view permissions

        return _.contains(permissions, 'view');
      });

      return {rows: rows, columns: this.collection.getColumns()};
    }

  });

  return TableSimple;

});