import Button from "./../button";


export function convertToBase64(file): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    //@ts-ignore
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

export default class Upload extends Button {
  private input: HTMLElement;
  private inp: HTMLInputElement;
  private _file: File;

  private fileUploadCbs: Function[] = [];
  constructor(fileUploadCb?: (file: File, base64: string) => any) {
    super(() => {
      this.open();
    });

    this.addFileUploadCb(fileUploadCb);

    let fileUploadFunc = async () => {
      let b = await this.getAsBase64();
      this.input.css("background-image", b);
      img.css("display", "none");
      this.fileUploadCbs.ea((f) => {
        f(this.file, b);
      })
    };

    this.inp = ce("input");
    this.inp.type = "file";
    this.inp.on("change", () => {
      this._file = this.inp.files[0];
    });



    this.input = ce("upload-input");
    this.input.on("mouseover", () => {
      this.input.addClass("hov");
    });
    this.input.on("mouseout", () => {
      this.input.removeClass("hov");
    });
    this.input.on("dragenter", () => {
      this.input.addClass("drg");
    });
    this.input.on("dragleave", () => {
      this.input.removeClass("drg");
    });
    this.input.on("focus", () => {
      this.input.addClass("foc");
    });
    this.input.on("blur", () => {
      this.input.removeClass("foc");
    });





    this.input.on("change", fileUploadFunc);


    let img = ce("img");
    img.src = "./assets/drop.svg";
    this.input.apd(img);


    this.input.on("drop", (e) => {
      e.preventDefault();
      e.stopPropagation();
      console.log(e);

      for (let i = 0; i < 99999999; i++) {
          console.log("ok");
      }
    })
    this.on("drop", (e) => {
      e.preventDefault();
      e.stopPropagation();
      console.log(e);

      for (let i = 0; i < 99999999; i++) {
          console.log("ok");
      }
    })

    this.inp.on("drop", (e) => {
      e.preventDefault();
      e.stopPropagation();
      console.log(e);

      for (let i = 0; i < 99999999; i++) {
          console.log("ok");
      }
    })
    img.on("drop", (e) => {
      e.preventDefault();
      e.stopPropagation();
      console.log(e);

      for (let i = 0; i < 99999999; i++) {
          console.log("ok");
      }
    })


    this.sra(this.input, this.inp);
  }

  public open() {
    this.inp.click();
  }

  public addFileUploadCb(cb?: (file: File, base64: string) => any) {
    this.fileUploadCbs.add(cb);
  }
  public removeFileUploadCb(cb?: (file: File, base64: string) => any) {
    this.fileUploadCbs.remove(cb);
  }

  public get file() {
    return this._file;
  }

  public getAsBase64(): Promise<string> {
    return convertToBase64(this.file);
  }
  stl() {
    return require('./upload.css').toString();
  }
}
window.customElements.define('c-upload', Upload);
