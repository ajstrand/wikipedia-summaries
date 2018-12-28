package main

import "log"
import "github.com/levigross/grequests"
import "net/http"
import "os"
import "fmt"


type Result struct {
    Text   string        `json:"extract"`
}

func getSummary(w http.ResponseWriter, r *http.Request) {
	enableCors(&w)
	message := r.URL.Query().Get("data")	

	var url = "https://en.wikipedia.org/api/rest_v1/page/summary/" + message;

	resp, err := grequests.Get(url, nil)
// You can modify the request by passing an optional RequestOptions struct
fmt.Println(resp)

if err != nil {
	log.Fatalln("Unable to make request: ", err)
}
var result Result
resp.JSON(&result)
var data = []byte(result.Text)
	fmt.Println(result)
	w.Write(data)
  }
  func enableCors(w *http.ResponseWriter) {
	(*w).Header().Set("Access-Control-Allow-Origin", "*")
}
  func main() {

	var debug  bool = true

	if debug == false {
		port := os.Getenv("PORT")

	if port == "" {
		log.Fatal("$PORT must be set")
	}
	http.HandleFunc("/api/getSummary", getSummary)
	dirName := "./dist"
	http.Handle("/", http.FileServer(http.Dir(dirName)))
	log.Println("Server started: http://localhost:" + port)
	if err := http.ListenAndServe(":" + port, nil); err != nil {
	  panic(err)
	}
	} else {
		port := "8080"

	http.HandleFunc("/api/getSummary", getSummary)
	dirName := "./dist"
	http.Handle("/", http.FileServer(http.Dir(dirName)))
	log.Println("Server started: http://localhost:" + port)
	if err := http.ListenAndServe(":" + port, nil); err != nil {
	  panic(err)
	}
	}

	
}
