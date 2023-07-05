package org.hudlow.query;

import java.time.ZonedDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.Map;
import java.util.HashMap;
import org.springframework.http.MediaType;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
public class QueryApplication {

	public static void main(String[] args) {
		SpringApplication.run(QueryApplication.class, args);
	}

  @RequestMapping(value = "/", method = RequestMethod.GET,
                  produces = MediaType.APPLICATION_JSON_VALUE)
  public Map<String,Object> parse(@RequestParam Map<String,String> allRequestParams) {
		HashMap<String,Object> parameters = new HashMap<String,Object>();

    for (Map.Entry<String,String> param : allRequestParams.entrySet()) {
			if (param.getKey().equals("cast_to_integer")) {
			  parameters.put(param.getKey(), Integer.valueOf(param.getValue()));
			} else if (param.getKey().equals("cast_to_float")) {
				parameters.put(param.getKey(), Double.valueOf(param.getValue()));
			} else if (param.getKey().equals("cast_to_boolean")) {
				parameters.put(param.getKey(), Boolean.valueOf(param.getValue()));
			} else if (param.getKey().equals("cast_to_date_time")) {
				ZonedDateTime datetime = ZonedDateTime.parse(param.getValue()).withZoneSameInstant(ZoneId.of("UTC"));
				parameters.put(param.getKey(), datetime.format(DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'")));
			} else {
				parameters.put(param.getKey(), param.getValue());
			}
		}

		return parameters;
  }

}
