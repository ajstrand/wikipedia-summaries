package main

import "log"
import "github.com/levigross/grequests"
import "net/http"

type Result struct {
    Text   string        `json:"extract"`
}

func getSummary(w http.ResponseWriter, r *http.Request) {
	enableCors(&w)

	message := r.URL.Query().Get("data")	

	var url = "https://en.wikipedia.org/api/rest_v1/page/summary/" + message;

	resp, err := grequests.Get(url, nil)
// You can modify the request by passing an optional RequestOptions struct

if err != nil {
	log.Fatalln("Unable to make request: ", err)
}
var result Result
resp.JSON(&result)
	w.Write([]byte(result.Text))
  }
  func main() {
	http.HandleFunc("/", getSummary)
	if err := http.ListenAndServe(":8080", nil); err != nil {
	  panic(err)
	}
}

func enableCors(w *http.ResponseWriter) {
	(*w).Header().Set("Access-Control-Allow-Origin", "*")
}
