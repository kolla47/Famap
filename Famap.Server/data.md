Scaffold command: 

Scaffold-DbContext -Connection Name=DB Microsoft.EntityFrameWorkCore.SqlServer -outputdir Models/DB -context DBContext -Force 

	- make sure to rename inverseFather, inverseMother, inverseSpouse

"ConnectionStrings": {
    "DB": "Server=(localdb)\\local;Initial Catalog=Fammap;Trusted_Connection=True;MultipleActiveResultSets=true;Persist Security Info=False"
  }


  EntityFrameworkCore