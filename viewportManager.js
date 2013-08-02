/**
 * ViewportManager – Utility to observe viewport state based upon defined declaration of ranges & sizes/
 *
 * Dependencies: 
 *   – lodash.js (or underscore.js) - http://lodash.com/
 */
;(function (w) {

  //
  // Initiate variables accessible at any scope within
  // this closure
  // 
  var doc = document,
      VM;


  /**
   * Constructor function to wrap our exported class
   * @param  {Class} _ Reference to lodash utility libraro
   * @return {Function}  Return reference to ViewportManager
   */
  VM = function (_) {

    /**
     * Localized instance of ViewportManager
     * @param  {Object} conf 
     *         Configuration object
     * @return {Class}  return a reference to this instance
     */
    ViewportManager = function (opts) {
      //
      // Merge passed in configuration options with
      // defaults of this class.
      // 
      this.config = _.extend(this.defaults, opts);
      this.debounceTime = opts.debounceTime ? opts.debounceTime : this.defaults.debounceTime;

      //
      // Configure events
      // 
      w.addEventListener(this.config.viewportChangeEvent, _.bind(this.observeViewportState, this));

      //
      // Auto-run
      // 
      this.observeViewportState.call(this, null);

      //
      // Allow for chaining
      // 
      return this;
    };


    ViewportManager.prototype = {

      /**
       * Reference to the previous state of the viewport
       * @type {String}
       */
      lastViewportState: '',

      /**
       * Value to hold the current state of the viewport
       * @type {String}
       */
      currentViewportState: '',

      /**
       * Determine whether to initially set a value or change it
       * @type {Boolean}
       */
      firstRun: true,

      /**
       * Configuration hash to be consumed by instances of this class. May be overwritten on instantiation via passed in object
       * @type {Object}
       */      
      defaults: {

        /**
         * Allow/prevent console.log(s)
         * @type {Boolean}
         */
        log: true,

        /**
         * Ranges to watch <key: lookup name> : <value: Array of min/max pixel widths>
         * @type {Object}
         */
        ranges: {
          desktop: [1025, 5000],
          tablet: [768, 1024],
          handheld: [1, 767]
        },

        /**
         * Amount of debounce to add to our event, depending on
         * sensitivityof UI schema, this may need to be changed
         * @type {Number}
         */
        debounceTime: 250,

        /**
         * Determine event to watch for Viewport change
         * @type {String}
         */
        viewportChangeEvent: 'onorientationchange' in w ? 'orientationchange' : 'resize'        
      },

      /**
       * Set the current viewport state
       * @param  {String, String} newState Key of the new state
       * and optional oldState
       */
      setViewportState: function (newState, oldState) {
        var shouldLog = this.config.log;

        this.currentViewportState = newState;
        if (oldState) {
          this.lastViewportState = oldState;
          if (shouldLog) 
            console.log('*** ViewportManager : Change from ' + oldState + ' to ' + newState);
        } else {
          if (shouldLog)
            console.log('*** ViewportManager – Viewport state: '+ newState);
        }
      },

      /**
       * Retrieve the currently set viewport state
       * @return {String} Key of the current viewport state
       */
      getViewportState: function () {
        return this.currentViewportState;
      },

      /**
       * Trigger the setting on a new viewport state
       * @param  {String} newState Key of the new viewport state
       */
      changeViewportState: function (newState) {
        var currentState, lastState;

        currentState = this.getViewportState();

        if (newState !== currentState) {
          lastState = currentState;
          this.setViewportState(newState, lastState);
        }
      },
      
      /**
       * Debounced handler of window resize/orientationchange event
       */      
      observeViewportState: _.debounce(function () {
        // 
        // TODO: Ensure full browser support
        // 
        var _w = doc.documentElement.clientWidth;
        //
        // Iterate over ranges to determine which set we 
        // currently fall within
        // 
        _.each(this.config.ranges, function (range, name) {
          if (_w >= range[0] && _w <= range[1]) {
            if (this.firstRun) {
              this.setViewportState(name);
              this.firstRun = false;
            } else {
              this.changeViewportState(name);
            }
          }
            
        }, this);

      }, this.debounceTime)
    };

    /**
     * Expose API
     */
    return ViewportManager;
  };


  /**
   * Transport / Export
   */
  if (typeof define === 'function' && define.amd) {
    define(['_'], VM);
  } else {
    window.viewportManager = VM(window.lodash);
  }

})(window);