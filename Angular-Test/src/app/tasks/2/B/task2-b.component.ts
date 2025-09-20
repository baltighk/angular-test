import { AfterViewInit, Component, OnDestroy, OnInit } from "@angular/core";

interface StatResult {
  count: number;
  min: number;
  max: number;
  avg: number;
  median: number;
  std: number;
}

@Component({
  selector: "app-task2-b",
  templateUrl: "./task2-b.component.html",
  styleUrls: ["./task2-b.component.less"],
  standalone: false,
})
export class Task2BComponent implements OnInit, OnDestroy {
  worker?: Worker;
  stats: StatResult[] = [];
  loading = false;
  numbers: number[] = [];
  minLoadingTime = 1000;
  private loadingTimeout: any;

  ngOnInit() {
    
    fetch("assets/csv/2B.csv")
      .then((res) => res.text())
      .then((text) => {
        this.numbers = text
          .split(/[\s,;\n\r]+/)
          .map((s) => parseFloat(s))
          .filter((n) => !isNaN(n));
        this.initWorker();
      });
  }

  ngOnDestroy() {
    if (this.worker) this.worker.terminate();
    if (this.loadingTimeout) clearTimeout(this.loadingTimeout);
  }

  initWorker() {
    
    if (typeof Worker !== "undefined") {
      this.worker = new Worker(
        new URL("../../../_workers/konva.worker", import.meta.url)
      );
      this.worker.onmessage = ({ data }) => {
        if (data && data.type === "stats") {
          
          const stat: StatResult = data.payload;
          
          const elapsed = Date.now() - this.loadingStart;
          const wait = Math.max(0, this.minLoadingTime - elapsed);
          this.loadingTimeout = setTimeout(() => {
            this.stats.push(stat);
            this.loading = false;
          }, wait);
          console.log("Statisztika:", stat);
        }
      };
      
      this.szamKuldes(this.numbers);
    }
  }

  szamKuldes(numbers: number[], append = false) {
    if (this.worker) {
      this.loading = true;
      this.loadingStart = Date.now();
      this.worker.postMessage({
        type: append ? "append" : "init",
        payload: numbers,
      });
    }
  }

  loadingStart = 0;

  ujGeneralas() {
    
    const newNumbers = Array.from(
      { length: 1000 },
      () => Math.random() * 200 -50
    );
    this.szamKuldes(newNumbers, true);
  }
}
