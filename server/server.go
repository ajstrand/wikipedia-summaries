package main

import "log"
import "github.com/levigross/grequests"
import "net/http"

type Result struct {
    Text   string        `json:"extract"`
}

func getSummary(w http.ResponseWriter, r *http.Request) {

	message := r.URL.Query().Get("data")	

	var url = "https://en.wikipedia.org/api/rest_v1/page/summary/" + message;

	resp, err := grequests.Get(url, nil)
// You can modify the request by passing an optional RequestOptions struct

if err != nil {
	log.Fatalln("Unable to make request: ", err)
}
var result Result
resp.JSON(&result)
var data = []]byte(result.Text)
	w.Write(data)
  }
  func main() {
	http.HandleFunc("/api/getSummary", getSummary)
	if err := http.ListenAndServe(":8080", nil); err != nil {
	  panic(err)
	}
}
