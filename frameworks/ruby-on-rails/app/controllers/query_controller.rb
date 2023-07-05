class QueryController < ApplicationController
  def parse
    parameters = {}
    request.query_parameters.each do |param, value|
      parameters[param] = value
      status = :ok

      begin
        if param === 'cast_to_integer'
          parameters[param] = value.to_i
        elsif param === 'cast_to_float'
          parameters[param] = value.to_f
        elsif param === 'cast_to_boolean'
          parameters[param] = ActiveModel::Type::Boolean.new.cast(value)
        elsif param === 'cast_to_date_time'
          parameters[param] = DateTime.parse(value).new_offset(0).rfc3339(3).sub(/\+00\:00/, 'Z')
        end
      rescue Exception
        parameters[param] = nil
        status = :bad_request
      end

      render :json => parameters, :status => status
    end
  end
end
