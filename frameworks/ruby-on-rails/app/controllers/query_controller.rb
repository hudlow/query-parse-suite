class QueryController < ApplicationController
  def parse
    parameters = {}
    request.query_parameters.each do |param, value|
      parameters[param] = value

      if param === 'cast_to_integer'
        parameters[param] = value.to_i
      elsif param === 'cast_to_float'
        parameters[param] = value.to_f
      elsif param === 'cast_to_boolean'
        parameters[param] = ActiveModel::Type::Boolean.new.cast(value)
      elsif param === 'cast_to_date_time'
        begin
          parameters[param] = DateTime.parse(value).new_offset(0).rfc3339(3).sub(/\+00\:00/, 'Z')
        rescue Exception
          parameters[param] = nil
        end
      end
    end

    render :json => parameters
  end
end
