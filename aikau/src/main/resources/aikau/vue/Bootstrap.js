/**
 * Copyright (C) 2005-2016 Alfresco Software Limited.
 *
 * This file is part of Alfresco
 *
 * Alfresco is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Alfresco is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with Alfresco. If not, see <http://www.gnu.org/licenses/>.
 */

/**
 * 
 * @module aikau/vue/Bootstrap
 * @extends external:dijit/_WidgetBase
 * @mixes module:alfresco/core/Core
 * @author Dave Draper
 * @since 1.0.NEXT
 */
define(["dojo/_base/declare",
        "dijit/_WidgetBase",
        "aikau/vue/Base" ,
        "dojo/_base/lang",
        "dojo/string",
        "vue"], 
        function(declare, _WidgetBase, Base, lang, string, Vue) {
   
   return declare([_WidgetBase, Base], {

      /**
       * The name of the element used for the bootstrap component that all child components
       * will be locally registered within.
       *
       * @instance
       * @type {string}
       * @default
       */
      bootstrapElement: "aikau-vue-bootstrap",

      /**
       * Creates the [bootstrapElement]{@link module:aikau/vue/Boostrap#bootstrapElement} into 
       * which all child components will be created.
       *
       * @instance
       */
      buildRendering: function aikau_vue_Bootstrap() {
         this.domNode = document.createElement(this.bootstrapElement);
      },

      /**
       * Registers a new Vue component for bootstrapping into which all child components are registered
       * and then creates a new Vue of that component.
       *
       * @instance
       */
      postCreate: function aikau_vue_Bootstrap__postCreate() {
         var registeredComponent = this.registerComponent({
            template: "<div>${widgets_slot}</div>"
         });

         Vue.component(this.bootstrapElement, {
            template: registeredComponent.template,
            components: registeredComponent.components
         });

         // jshint nonew:false
         new Vue({
            el: "#" + this.id
         });
      }
   });
});