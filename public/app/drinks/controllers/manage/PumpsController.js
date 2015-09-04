(function(){
	angular.module('drinks')
		.controller('drinks.controllers.manage.PumpsController', ['Ingredient', 'drinks.resource.PumpResource', PumpsController]);

	function PumpsController(Ingredient, Pump)
	{
		this.ingredients = Ingredient.query();
		this.pumps = Pump.query();
		this.pins = [
			{id: 2, label: 'GPIO_02'},
			{id: 3, label: 'GPIO_03'},
			{id: 4, label: 'GPIO_04'},
			{id: 5, label: 'GPIO_05'},
			{id: 6, label: 'GPIO_06'},
			{id: 7, label: 'GPIO_07'},
			{id: 8, label: 'GPIO_08'},
			{id: 9, label: 'GPIO_09'},
			{id: 10, label: 'GPIO_10'},
			{id: 11, label: 'GPIO_11'},
			{id: 12, label: 'GPIO_12'},
			{id: 13, label: 'GPIO_13'},
			{id: 14, label: 'GPIO_14'},
			{id: 15, label: 'GPIO_15'},
			{id: 16, label: 'GPIO_16'},
			{id: 17, label: 'GPIO_17'},
			{id: 18, label: 'GPIO_18'},
			{id: 19, label: 'GPIO_19'},
			{id: 20, label: 'GPIO_20'},
			{id: 21, label: 'GPIO_21'},
			{id: 22, label: 'GPIO_22'},
			{id: 23, label: 'GPIO_23'},
			{id: 24, label: 'GPIO_24'},
			{id: 25, label: 'GPIO_25'},
			{id: 26, label: 'GPIO_26'},
			{id: 27, label: 'GPIO_27'}
		];

		this.deleteRecord = function(record)
		{
			if (confirm('Are you sure?')) {
				record.$delete({id: record._id}, function(){
					for (var i = 0; i < self.pumps.length; i++) {
						if (self.pumps[i] == record) {
							self.pumps.splice(i, 1);
							break;
						}
					}
				});
			}
		};

		this.addPump = function()
		{
			if (!this.pumps)
				this.pumps = [];

			this.pumps.push(new Pump());
		};

		this.save = function()
		{
			for (var i = 0; i < this.pumps.length; i++) {
				if (angular.isString(this.pumps[i]._id))
					this.pumps[i].$update({id: this.pumps[i]._id});
				else
					this.pumps[i].$save();
			}
		};

		/**
		 * Move a pump up in the order
		 * @param pump
		 */
		this.movePumpUp = function(pump)
		{
			// Init if necessary
			if (isNaN(pump.order)) {
				pump.order = 0;
			}

			if (pump.order == 0) {
				return;
			}

			var newOrder = pump.order - 1;

			for (var i = 0; i < this.pumps.length; i++) {
				if (this.pumps[i].order == newOrder) {
					++this.pumps[i].order;
					break;
				}
			}

			pump.order = newOrder;
		};

		/**
		 * Move a pump down in the order
		 * @param pump
		 */
		this.movePumpDown = function(pump)
		{
			// Init if necessary
			if (isNaN(pump.order)) {
				pump.order = 0;
			}

			if (pump.order >= this.pumps.length - 1) {
				return;
			}

			var newOrder = pump.order + 1;

			for (var i = 0; i < this.pumps.length; i++) {
				if (this.pumps[i].order == newOrder) {
					--this.pumps[i].order;
					break;
				}
			}

			pump.order = newOrder;
		};
	}
})();