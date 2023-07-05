package main

import (
  "fmt"
  "encoding/json"
  "net/http"
  "strconv"
  "time"
)

func main() {
  http.HandleFunc("/", QueryParser)
  http.ListenAndServe(":1866", nil)
}

func QueryParser(w http.ResponseWriter, r *http.Request) {
  parameters := map[string]interface{}{}
  for param := range r.URL.Query() {
    parameters[param] = r.URL.Query().Get(param)

    if (param == "cast_to_integer") {
      newValue, err := strconv.Atoi(parameters[param].(string))

      if (err == nil) {
        parameters[param] = newValue
      } else {
        parameters[param] = nil
        w.WriteHeader(http.StatusBadRequest)
      }
    } else if (param == "cast_to_float") {
      newValue, err := strconv.ParseFloat(parameters[param].(string), 64)

      if (err == nil) {
        parameters[param] = newValue
      } else {
        parameters[param] = nil
        w.WriteHeader(http.StatusBadRequest)
      }
    } else if (param == "cast_to_boolean") {
      newValue, err := strconv.ParseBool(parameters[param].(string))

      if (err == nil) {
        parameters[param] = newValue
      } else {
        parameters[param] = nil
        w.WriteHeader(http.StatusBadRequest)
      }
    } else if (param == "cast_to_date_time") {
      newValue, err := time.Parse(time.RFC3339, parameters[param].(string))

      if (err == nil) {
        parameters[param] = newValue.Format("2006-01-02T15:04:05.000Z")
      } else {
        parameters[param] = nil
        w.WriteHeader(http.StatusBadRequest)
      }
    }
  }

  jsonString, err := json.Marshal(parameters)

  if (err != nil) {
    w.WriteHeader(http.StatusBadRequest)
  }

  fmt.Fprintf(w, string(jsonString))
}
