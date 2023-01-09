function validateNumbers( value, msg_id, field_name, btn_id ) 
{
	if ( value.length > 0 ) 
	{
		if ( value.match('[a-zA-Z]') || value.match('[,.|!@#$%&*()-]') || value < 0 ) 
		{
			document.getElementById(field_name).style.border = '3px solid red';
			document.getElementById(msg_id).innerHTML = 'Takes Positive Numbers only';
			document.getElementById( btn_id ).disabled = 'disabled';
			return 0;
		} 
		else 
		{
			document.getElementById( field_name ).style.border = '3px solid green';
			document.getElementById( msg_id ).innerHTML = '';
			return 1;
		}
	}
	else
	{
		document.getElementById( btn_id ).disabled = 'disabled';
	}
}

function validateToDecimalFields() 
{
	let main_value = document.getElementById('main_value').value;
	let old_base = document.getElementById('old_base').value;
	let pass = validateNumbers( main_value, 'decimal_msg', 'main_value', 'convert_to_decimal' );

	if ( pass == 1) 
	{
		pass = validateNumbers( old_base, 'decimal_msg', 'old_base', 'convert_to_decimal' );

		if ( pass == 1 ) 
		{
			if ( old_base <= 1 || old_base > 9 ) 
			{
				document.getElementById('old_base').style.border = '3px solid red';
				document.getElementById('base_msg').innerHTML = 
				"Base shouldn't be lesser than 2 or greater than 9!!! ";
				document.getElementById('convert_to_decimal').disabled = 'disabled';
			} 
			else 
			{
				document.getElementById('base_msg').innerHTML = "";
				let value_length = main_value.length;

				for ( var i = 0; i < value_length; i++ ) 
				{
					let cur_val_on_loop = main_value.substr( i, 1 );

					if ( cur_val_on_loop >= old_base ) 
					{
						document.getElementById('main_value').style.border = '3px solid red';
						document.getElementById('decimal_msg').innerHTML = 
						"This shouldn't contain an individual value, equal-to or greater than the base you are converting from!!! ";
						document.getElementById('convert_to_decimal').disabled = 'disabled';
						break;
					} 
					else 
					{
						document.getElementById('main_value').style.border = '3px solid green';
						document.getElementById('decimal_msg').innerHTML = " ";
						document.getElementById('convert_to_decimal').disabled = '';
					}
				}
			}
		} 
	}
}

function convertToDecimal() 
{
	let main_value = document.getElementById('main_value').value;
	let old_base = document.getElementById('old_base').value;
	let value_length = main_value.length;
	let new_base = 0;

	for ( var i = 0; i < value_length; i++ ) 
	{
		let cur_val_on_loop = main_value.substr( i, 1 );
		new_base += cur_val_on_loop *  Math.pow( old_base, ( ( value_length - 1 ) - i ) );
	}

	document.getElementById('decimal_result').innerHTML = 
	'<strong>'+main_value+'<sub>'+old_base+'</sub></strong>'+' is equivalent to <strong>'+new_base+'<sub>10</sub></strong>'; 
	document.getElementById('result_div').style.display = 'block';
	document.getElementById('btn_div').style.display = 'block';
	document.getElementById('decimal_result_hr').style.display = 'block';
}

function resultVisibilityState( result_id, btn_id ) 
{
	let btn_state = document.getElementById( btn_id );
	let result_state = document.getElementById( result_id );
	if ( btn_state.value == 'show') 
	{
		result_state.style.visibility = 'hidden';
	  btn_state.value =	'hide';
	  btn_state.innerHTML = 'show result';
	} 
	else 
	{
		btn_state.value = 'show';
		btn_state.innerHTML = 'hide result';
		result_state.style.visibility = 'visible';
	}
}

function resetAll( field_one_id, field_two_id, btn_div_id, btn_id, result_div_id ) 
{
	document.getElementById( field_one_id ).value = '';
	document.getElementById( field_one_id ).style.border = '1px solid grey';
	document.getElementById( field_two_id ).style.border = '1px solid grey';
	document.getElementById( field_two_id ).value = '';
	document.getElementById( btn_div_id ).style.display = 'none';
	document.getElementById( result_div_id ).style.display = 'none';
	document.getElementById( btn_id ).disabled = 'disabled';
}

function validateFromDecimalFields() 
{
	let decimal_value = document.getElementById('decimal_value').value;
	let new_base = document.getElementById('new_base').value;
	let pass = validateNumbers( decimal_value, 'from_decimal_msg', 'decimal_value', 'convert_from_decimal' );

	if ( pass == 1) 
	{
		pass = validateNumbers( new_base, 'from_decimal_msg', 'new_base', 'convert_from_decimal' );
		if ( pass == 1 ) 
		{
			if ( new_base > 1 && new_base <= 9 ) 
			{
				document.getElementById('convert_from_decimal').disabled = '';
				document.getElementById('new_base').style.border = '3px solid green';
				document.getElementById('from_decimal_msg').innerHTML = '';
			}
			else
			{
				document.getElementById('new_base').style.border = '3px solid red';
				document.getElementById('from_decimal_msg').innerHTML = " Base shouldn't be lesser than 2 or greater than 9!!! ";
				document.getElementById('convert_from_decimal').disabled = 'disabled';
			}
		}
	}
}


function convertFromDecimal() 
{
	let decimal_value = document.getElementById('decimal_value').value;
	let old_base = decimal_value;
	let new_base = document.getElementById('new_base').value;
	let div_result = decimal_value / new_base;
	let result = "";
	
	if ( div_result >= 1 ) 
	{
		while( div_result >= 1 )
		{
			let str_res = ""+ div_result+"";
			
			if ( str_res.match('[.]') ) 
			{
				let dot_position = str_res.indexOf('.');
				let whole_num = str_res.substr( 0, dot_position );
				let remainder = decimal_value - ( whole_num * new_base );

				decimal_value = whole_num;
				result +=""+remainder+"";
				div_result = whole_num / new_base;

				let endpoint = whole_num - new_base;

				if ( endpoint < 0 ) 
				{
				 	result +=""+whole_num+"";
					div_result = 0;
				}
			} 
			else 
			{
				if ( div_result != 1  ) 
				{
					result += "0";
					decimal_value = div_result;
					div_result /= new_base;
				} 
				else 
				{
					result += "01";
					div_result = 0;
				}
			}
		}
	}
	else
	{
		result = decimal_value;
	}

	let final_result = result;

	document.getElementById('from_dec_result_div').style.display = 'block';
	document.getElementById('from_dec_result').innerHTML = 
	'<b>'+old_base+"<sub>10</sub></b> is equivalent to <b>"+stringReverse( final_result, 'ordered_result' )+"<sub>"+new_base+"</sub></b>"; 
	document.getElementById('from_dec_btn_div').style.display = 'block';	
}

function stringReverse( string, result_field_id ) 
{
	let string_length = string.length;
	let reverse_str = "";
	for (var i = string_length; i >= 0; i--) 
	{
		reverse_str += string.substr( i, 1 );
	}
	return reverse_str;
}

function currentYear() 
{
	let date = new Date();
	let year = date.getFullYear();
	
	document.getElementById('footer_text').innerHTML += year;
}

currentYear();