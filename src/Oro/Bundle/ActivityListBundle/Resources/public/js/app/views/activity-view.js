/*jslint browser:true, nomen:true*/
/*global define, alert*/
define([
    'jquery',
    'underscore',
    'oroui/js/app/views/base/view',
    'routing',
    'orolocale/js/formatter/datetime'
], function ($, _, BaseView, routing, dateTimeFormatter) {
    'use strict';

    var ActivityView;
    ActivityView = BaseView.extend({
        options: {
            template: null,
            briefTemplates: {},
            fullTemplates: {}
        },
        attributes: {
            'class': 'list-item'
        },
        events: {
            //'click .item-edit-button':   'onEdit',
            //'click .item-remove-button': 'onDelete',
            //'click .accordion-toggle':   'onToggle'
        },
        listen: {
            //'change model': '_onModelChanged'
        },

        initialize: function (options) {
            /*
            debugger;
            this.options = _.defaults(options || {}, this.options);
            this.collapsed = false;
            if (!this.options.template) {
                this.template = _.template($(this.options.template).html());
            }
            */
        },

        getTemplateData: function () {
            var data = ActivityView.__super__.getTemplateData.call(this);

            //data.collapsed = this.collapsed;
            data.createdAt = dateTimeFormatter.formatDateTime(data.createdAt);
            data.updatedAt = dateTimeFormatter.formatDateTime(data.updatedAt);
            //data.template  = this.
            //data.message = _.escape(data.message);
            //data.brief_message = data.message.replace(new RegExp('\r?\n', 'g'), ' ');
            //data.message = data.message.replace(new RegExp('\r?\n', 'g'), '<br />');
            //data.message = autolinker.link(data.message, {className: 'no-hash'});
            //data.brief_message = autolinker.link(data.brief_message, {className: 'no-hash'});

            return data;
        },

        onEdit: function () {
            alert('onEdit');
            //this.model.collection.trigger('toEdit', this.model);
        },

        onDelete: function () {
            alert('onDelete');
            //this.model.collection.trigger('toDelete', this.model);
        },

        onToggle: function (e) {
            alert('onToggle');
            e.preventDefault();
            this.toggle();
        },

        /**
         * Collapses/expands view elements
         *
         * @param {boolean=} collapse
         */
        toggle: function (collapse) {
            if (_.isUndefined(collapse)) {
                collapse = !this.isCollapsed();
            }
            this.$('.accordion-toggle').toggleClass('collapsed', collapse);
            this.$('.collapse').toggleClass('in', !collapse);
        },

        isCollapsed: function () {
            return this.$('.accordion-toggle').hasClass('collapsed');
        },

        _onModelChanged: function () {
            this.collapsed = this.isCollapsed();
            this.render();
        }
    });

    return ActivityView;
});
