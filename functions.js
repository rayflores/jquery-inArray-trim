(function ($) {

	$(document).ready(function (){
		if($('.product-addon').length > 0){

			/*
			function showColorAddon(selOp){
				var colorSelect=$('select.addon-select[name*="for-premium-covers-pick-color"]'),
				selectedOpt = $('option:selected', selOp).val(),
				showColorOptions=new Array();
				if(selectedOpt == 'standard-haze-gray-double-duck-no-color-options-1'){
					showColorOptions=new Array();
				}
				else if(selectedOpt == 'premium-poly-guard-pick-color-2'){
					showColorOptions=new Array('Haze Gray', 'Beige', 'White');
				}
				else if(selectedOpt == 'premimum-sundura-pick-color-3'){
					showColorOptions=new Array('Admiral Navy', 'Cobalt Blue', 'Black', 'Maroon', 'Green', 'Red', 'Storm Gray', 'Teal', 'Yellow', 'Mist Gray', 'Khaki (tan)');
				}
				else if(selectedOpt == 'premimum-sunbrella-pick-color-4'){
					showColorOptions=new Array('Silver', 'Toast', 'Aquamarine', 'Burgundy', 'Cadet Gray', 'Captain Navy', 'Charcoal Gray', 'Forest Green', 'Jet Black', 'Jockey Red', 'Linen', 'Logo Red', 'Marine Blue', 'Natural', 'Ocean Blue', 'Pacific Blue', 'Persian Green', 'Royal Blue', 'Sunflower', 'Mediterranean Blue');
				}
				$('option', colorSelect).each(function(i){
					if(i != 0){
						if($.inArray($(this).text(), showColorOptions) >= 0){
							$(this).show();
						}
						else {
							$(this).hide();
						}
					}
				});
				colorSelect.val('Select an option...').trigger("chosen:updated");
			}
			var premiumSelect=$('select.addon-select[name*="standard-or-premium"]'),
			colorSelect=$('select.addon-select[name*="for-premium-covers-pick-color"]');
			if(premiumSelect.length > 0 && colorSelect.length > 0){
				showColorAddon($('option:selected',premiumSelect));
				premiumSelect.on('change', function(){
					showColorAddon($(this));
				});
			}
			*/

			function optionConditional(selOp){
				var selectedOpt = $('option:selected', selOp).val(),
				showSelectOptions=[];
				//
				// Based on which select was used, get ready to 
				// manipulate the corresponding select options
				if(/attribute_select-cover/i.test(selOp.attr('name'))){
					
					if(/(haze grey only)/i.test(selectedOpt.toLowerCase()) || /(haze grey)/i.test(selectedOpt.toLowerCase()) || /(h. grey)/i.test(selectedOpt.toLowerCase()) || /(h.grey)/i.test(selectedOpt.toLowerCase())){
						
						showSelectOptions={'standard-or-premium':'Standard-Haze Gray Double Duck (No Color Options)', 'for-premium-covers-pick-color':''};
					}
					else {
						showSelectOptions={'standard-or-premium':'reset', 'for-premium-covers-pick-color':'reset'};	
					}
				}
				else if(/standard-or-premium/i.test(selOp.attr('name'))){
					if(selectedOpt == 'standard-haze-gray-double-duck-no-color-options-1'){
						showSelectOptions={'for-premium-covers-pick-color':''};
					}
					else if(selectedOpt == 'premium-poly-guard-pick-color-2'){
						showSelectOptions={'for-premium-covers-pick-color':'Haze Gray, Beige, White'};
					}
					else if(selectedOpt == 'premimum-sundura-pick-color-3'){
						showSelectOptions={'for-premium-covers-pick-color':'Admiral Navy, Cobalt Blue, Black, Maroon, Green, Red, Storm Gray, Teal, Yellow, Mist Gray, Khaki (tan)'};
					}
					else if(selectedOpt == 'premimum-sunbrella-pick-color-4'){
						showSelectOptions={'for-premium-covers-pick-color':'Silver, Toast, Aquamarine, Burgundy, Cadet Gray, Captain Navy, Charcoal Gray, Forest Green, Jet Black, Jockey Red, Linen, Logo Red, Marine Blue, Natural, Ocean Blue, Pacific Blue, Persian Green, Royal Blue, Sunflower, Mediterranean Blue'};
					}
				}
				else if(/attribute_material/i.test(selOp.attr('name'))){
					if(selectedOpt == 'Performance Poly'){
						showSelectOptions={'for-premium-covers-pick-color':'Haze Gray, Beige, White'};
					}
					else if(selectedOpt == 'Sunbrella'){
						showSelectOptions={'for-premium-covers-pick-color':'Admiral Navy, Cobalt Blue, Black, Maroon, Green, Red, Storm Gray, Teal, Yellow, Mist Gray, Khaki (tan)'};
					}
					else if(selectedOpt == 'Sundura'){
						showSelectOptions={'for-premium-covers-pick-color':'Silver, Toast, Aquamarine, Burgundy, Cadet Gray, Captain Navy, Charcoal Gray, Forest Green, Jet Black, Jockey Red, Linen, Logo Red, Marine Blue, Natural, Ocean Blue, Pacific Blue, Persian Green, Royal Blue, Sunflower, Mediterranean Blue'};
					}
				}

				$.each(showSelectOptions, function(key,value){
					var conditionalSelect=$('select[name*="'+key+'"]');
					$('option', conditionalSelect).show();
					if(value == 'reset'){
						$('option', conditionalSelect).show();
						$(value).show();
					}
					else {
						var showOptionsArr=value.replace(/,\s/g, ',').split(',');
						$('option', conditionalSelect).each(function(i){
							if(i != 0){
								if($.inArray($.trim($(this).text()), showOptionsArr) > -1){
									// without $.trim() there is a space at the end of the $.text()
									// that is why there was no match and function failed.
									$(this).show();
								}
								else {
									$(this).hide();
								}
							}
						});
					}
					conditionalSelect.trigger("chosen:updated");
				});

			}

			$('form.variations_form select').on('change', function(){
				optionConditional($(this));
			});
		}
	});

}(window.jQuery || window.$));